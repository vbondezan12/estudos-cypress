import { faker } from '@faker-js/faker';
import { LIFT_CREDENTIALS } from '../../../config/constants';
import { LoginPage } from '../../../support/page_objects/lift/login_page';


describe('Lift Login', { tags: [ '@Login', '@regression' ] }, () => {

  const loginPage = new LoginPage();

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const username = LIFT_CREDENTIALS.USERNAME;
    const password = LIFT_CREDENTIALS.PASSWORD;
    const clientId = LIFT_CREDENTIALS.CLIENT_ID;

    loginPage.open()
    loginPage.login(username, password, clientId);

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const clientId = LIFT_CREDENTIALS.CLIENT_ID;

    loginPage.open()
    loginPage.login(username, password, clientId);

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/login`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'User could not be authenticated. Please check your user, password and client code');
  });


})