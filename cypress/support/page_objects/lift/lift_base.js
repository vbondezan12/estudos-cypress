import { MockLoanServiceApi } from '../../api_objects/mock_loan_service/mock_loan_service_api';

/**
 * Base class for all common Lift methods
 */
export class LiftBase extends MockLoanServiceApi {

  get paymentsSideMenu() {
    return cy.contains('span', 'Payments').should('be.visible');
  }

  get secureExchangeSideMenu () {
    return cy.get('a[href="#"]').contains('Secure Exchange').should('be.visible')
  }

  get documentsSideMenu () {
    return cy.get('a[href="#"]').contains('Documents').should('be.visible')
  }

  get reportingSideMenu () {
    return cy.get('a[href="#"]').contains('Reporting').should('be.visible')
  }

  clickPaymentsSideMenu() {
    this.paymentsSideMenu.click()
  }

  clickSecureExchangeSideMenu() {
    this.secureExchangeSideMenu.click()
  }

  clickDocumentsSideMenu() {
    this.documentsSideMenu.click()
  }

  clickReportingSideMenu() {
    this.reportingSideMenu.click()
  }

}