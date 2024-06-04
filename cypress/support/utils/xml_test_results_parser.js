const Parser = require('junitxml-to-javascript');
const TEST_RESULTS_XML_PATH = 'cypress/reports/xml/all-test-results.xml';
const OFFA_BASE_URL = 'http://54.70.200.139';

module.exports.sendOffaResults = async function () {
  const offaToken = require('../../../cypress.env.json').qa.offaToken;
  const url = `${ OFFA_BASE_URL }/execution-json-upload?token=${ offaToken }`;

  const payload = await this.generateOffaPayload();

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => {
    // Assert the status code is 201
    if (response.status === 201) {
      console.log('Test Results were Successfully Saved in OFFA Reporting Service');
      console.log('Status Code: ', response.status);
      response.json().then((data) => {
        console.log(data);
      });
    } else {
      console.error('Failed to Save Test Results in OFFA Reporting Service');
      console.error('Expected Status Code: 201, Response Status Code: ', response.status);
      console.error('Response Data: ', response.data);
    }
  });
};

/**
 * Generate the payload for the OFFA API
 * @returns {Promise<{tests: string, info: {summary: string, test_plan_id: string, version: string}}>}
 */
module.exports.generateOffaPayload = async function () {
  const testCases = await this.getTestResults();

  const info = {
    test_plan_id: 'VEN-123',
    summary: 'Lift Test Suite Results',
    version: Date.now().toString(),
    start_date: '2024-05-31T12:00:01',
    finish_date: '2024-05-31T12:15:08',
    test_plan_key: 'Ventanex_Lift_Test_Suite',
    test_environment: 'QA',
    team_name: 'Ventanex'
  };

  return {
    info: info,
    tests: testCases
  };
};

/**
 * Get the test results from the XML file
 * @returns {Promise<*[]>}
 */
module.exports.getTestResults = async function () {
  let testCases = [];
  await new Parser({ customTag: 'LIFT' })
    .parseXMLFile(TEST_RESULTS_XML_PATH)
    .then(report => {
      report.testsuites.forEach(testSuite => {
        testSuite.testCases.forEach(testCase => {
          if (testSuite.name.startsWith('VEN-')) {
            testCases.push({
              test_key: testSuite.name,
              duration: testCase.duration,
              status: testCase.result === 'succeeded' ? 'PASSED' : 'FAILED'
            });
          }
        });
      });
    })
    .catch(err => {
      console.error(err.message);
    });

  return testCases;
};