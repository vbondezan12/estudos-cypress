import { AuthenticationUtils } from '../../utils/authentication_utils';
import { MockLoanServicePayloadGenerator } from '../../payload_generators/mock_loan_service/mock_loan_service_payload_generator';

const baseUrl = `${ Cypress.config().mockLoanService.baseUrl }/api/v1`;

/**
 * API for Mock Loan Service
 */
export class MockLoanServiceApi extends AuthenticationUtils{
  payloadGenerator = new MockLoanServicePayloadGenerator()

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

  /**
   * Get an array of Test Loans
   * @param body The request body
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  getTestLoans(body) {
    return cy.request({
      method: 'GET', 
      url: `${ baseUrl }/test/lookup`, 
      failOnStatusCode: true,
      body: body 
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
  getMfaCode(body) {
    return cy.request({
      method: 'GET', // this variable save the type of method/endpoint we need use
      url: `${ baseUrl }/test/mfa`, //this variable save the url/lik of endpoint that we need run
      failOnStatusCode: true, // Don't allow that bad response pass into then
      body: body // this variable save the json that we enter in the Body field at API (Postman)
    });
  }
}