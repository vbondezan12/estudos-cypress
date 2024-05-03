import { MockLoanServicePayloadGenerator } from '../../payload_generators/mock_loan_service/mock_loan_service_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const baseUrl = `${ Cypress.config().mockLoanService.baseUrl }/api/v1`;
const payloadGenerator = new MockLoanServicePayloadGenerator();

/**
 * API for Mock Loan Service
 */
export class MockLoanServiceApi extends AuthenticationUtils {

  /**
   * Retrieves a Selene loan using the provided request body.
   *
   * @param {JSON} body - a JSON object containing the loan number
   * @return {Response} the response from the loan retrieval request
   */
  getSeleneLoan(body) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/selene/lookup`,
      failOnStatusCode: true,
      body: body
    });
  }

  /**
   * Retrieves a MSP loan using the provided request body.
   *
   * @param {JSON} body - a JSON object containing the loan number
   * @return {Response} the response from the loan retrieval request
   */
  
  getMspLoan(body) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/msp/lookup`,
      failOnStatusCode: true,
      body: body
    });
  }

  getTestLoans(clientId, loanStatus) {
    return cy.request({
      method: 'GET', 
      url: `${ baseUrl }/test/lookup`, 
      failOnStatusCode: true,
      body: payloadGenerator.generateTestCredentialsLookupPayload(clientId, loanStatus)
    });
  }

  /**
   * Fetch all Microbilt account with matching message
   * If no message match, an array of all Microbilt accounts will be returned
   * @param body The request body
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  getMicrobiltAccounts(body) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/test/microbilt`,
      failOnStatusCode: true,
      body: body
    });
  }

//Method that run the endpoint do generate the MFA code. Code used to login in VHDA webpay in qa enviroment
  getLastMfaCode(clientId, email) {
    return cy.request({
      method: 'GET', // this variable save the type of method/endpoint we need use
      url: `${ baseUrl }/test/mfa`, //this variable save the url/lik of endpoint that we need run
      failOnStatusCode: true, // Don't allow that bad response pass into then
      body: payloadGenerator.generateMfaPayload(clientId, email) 
    });
  }
}