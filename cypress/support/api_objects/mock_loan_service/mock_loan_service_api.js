const baseUrl = Cypress.config().mockLoanService.baseUrl;

/**
 * API for Mock Loan Service
 */
export class MockLoanServiceApi {

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
      failOnStatusCode: false,
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
      failOnStatusCode: false,
      body: body
    });
  }
}