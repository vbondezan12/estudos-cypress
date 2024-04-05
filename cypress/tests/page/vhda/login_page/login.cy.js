import {LoginPage} from '../../../../support/page_objects/vhda/login/login_page'

describe('Tests of Login', { tags: [ '@Login', '@regression' ] }, () => {
    let loginPage = new LoginPage()
     
    it('Login successfully with valid credentials', { tags: '@smoke' }, function () {

        //Variables necessary to execute the tests cases
        const userName = 'PriscillaRepay';
        const password = 'Repay123Repay123@';

        //Test execution
        loginPage.openPage();   
        loginPage.enterUserName(userName);
        loginPage.enterPassword(password);  

        //Test validation
        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

      });
      });