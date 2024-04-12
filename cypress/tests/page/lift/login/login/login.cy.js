import { faker } from '@faker-js/faker';
import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';


describe('Lift Login', { tags: [ '@Login', '@regression' ] }, () => {

  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  let testCredential;

  before(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
    });
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const username = testCredential.username;
    const password = testCredential.password;
    const clientId = CLIENT.VENTANEX;

    loginPage.open()
    loginPage.login(username, password, clientId);

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const clientId = CLIENT.VENTANEX;

    loginPage.open()
    loginPage.login(username, password, clientId);

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/login`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'User could not be authenticated. Please check your user, password and client code');
  });


})