const Parser = require('junitxml-to-javascript');
const xmlPath = 'cypress/reports/xml/all-test-results.xml';
let testSuites;
let testCases = [];

new Parser({ customTag: 'LIFT' })
  .parseXMLFile(xmlPath)
  .then(report => {
    testSuites = report.testsuites;
    testSuites.forEach(object => {
      testCases.push(object.testCases);
    });
    console.log(JSON.stringify(report, null, 2));

    console.log('testsuites: ' + testSuites.length + ', testCases: ' + testCases.length);
  })
  .catch(err => {
    console.error(err.message);
  });