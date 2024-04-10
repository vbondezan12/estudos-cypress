import { LoginPage } from '../../../../support/page_objects/vhda/login/login_page';
import { CLIENT } from '../../../../config/constants';
import { MockLoanServiceApi } from '../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LOAN_STATUS } from '../../../../config/constants';
import { faker } from '@faker-js/faker';

describe('Login Tests', { tags: [ '@Login', '@regression' ] }, () => {
    let loginPage = new LoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    let testCredential;
    let testMfaCode;
    let mfaCode;

    before(() => {
        const testPayload = mockLoanServiceApi.payloadGenerator.generateTestCredentialsLookupPayload(CLIENT.VHDA, LOAN_STATUS.CURRENT)
        mockLoanServiceApi.getTestLoans(testPayload).then((response) => {
            testCredential = response.body[2]  
            cy.log(testCredential) ; 
            cy.log(JSON.stringify(testCredential))  
          });
    })

      
    //------Tests Login Page---------

    it('Login with valid credentials (Happy Path)', { tags: '@smoke' }, function () {

        //Necessary variables do execute the test
        const userName = testCredential.username;
        const password = testCredential.password; 
        //const clientId = CLIENT.VHDA
        
        //Test execution
        loginPage.openPage();   
        loginPage.enterUserName(userName);
        loginPage.enterPassword(password);   
        loginPage.clickLoginButton();
        
        //Test validation
        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

        
        //-------Tests MFA Page-------

        //time necessary to mfa code update in endpoint (API)
        cy.wait(50000)
        
        // Get MFA code from API
        const email = "priscillaufpa@gmail.com"
        const payloadMfa = mockLoanServiceApi.payloadGenerator.generateMFAPayload(email)
        mockLoanServiceApi.getMfaCode(payloadMfa).then((response) => {
            mfaCode = response.body
            cy.log(mfaCode);
            expect(response.status).to.eq(200); 

       //Test execution
        loginPage.enterMFACode(mfaCode);
        loginPage.clickAuthenticateButton();

         //Test validation
         cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }`);

      });
    
})

      //-------Tests MFA Page-------

     // it('Authenticate with valid MFA Code (Happy Path)', { tags: '@smoke' }, function () {

        //Necessary variables do execute the test
       // const multifactorToken = mfaCode;
        //cy.log(multifactorToken);
        
        //Test execution  
       // loginPage.openMultifactorPage();
        //loginPage.enterMFACode(multifactorToken);  
        //loginPage.clickAuthenticateButton();
        
        //Test validation
        //cy.url().should('contains', 'https://msp-qa-17383b0a51c3.herokuapp.com/');
      //});



  })


//describe('Login Tests', { tags: [ '@Login', '@regression' ] }, () => {
//   let loginPage = new LoginPage();

    //Teste 1

//   it('Login with valid credentials (Happy Path)', { tags: '@smoke' }, function () {

//        //Necessary variables do execute the test
//        const userName = 'PriscillaRepay';
//        const password = 'Repay123Repay123@'; 
        
        //Test execution
//        loginPage.openPage();   
//        loginPage.enterUserName(userName);
//        loginPage.enterPassword(password);   
//        loginPage.clickLoginButton();
        
        //Test validation
//        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);
//      });
    
