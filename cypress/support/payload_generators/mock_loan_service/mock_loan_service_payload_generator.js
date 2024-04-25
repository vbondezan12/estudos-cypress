export class MockLoanServicePayloadGenerator {

  /**
   * Generates a payload for looking up Test Credentials
   * @param clientId The client ID
   * @param loanStatus The status of the loan to query
   * @returns {{loan_status, environment: *, client_id}}
   */
  generateTestCredentialsLookupPayload(clientId, loanStatus) {
    return {
      client_id: clientId,
      environment: Cypress.config().environment,
      loan_status: loanStatus
    };
  }

  /**
   * Generate a payload for looking up Microbilt accounts
   * @param message A matching message in the record
   * @returns {{message}}
   */
  generateMicrobiltPayload(message) {
    return {
      message: message
    };
  }

  generateMfaPayload(clientId, email) {
    return {
      client_id: clientId,
      email: email
    };
  }
}
