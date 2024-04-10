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

    before(() => {
        const testPayload = mockLoanServiceApi.payloadGenerator.generateTestCredentialsLookupPayload(CLIENT.VHDA, LOAN_STATUS.CURRENT)
        mockLoanServiceApi.getTestLoans(testPayload).then((response) => {
            testCredential = response.body[2]  
            cy.log(testCredential) ; 
            cy.log(JSON.stringify(testCredential))  
          });
    })

      
    //Teste 1
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

        const email = "repay.lift.automation@gmail.com"
        const payloadMfa = mockLoanServiceApi.payloadGenerator.generateMFAPayload(email)
        //cy.log(JSON.stringify(payloadMfa)) 

        mockLoanServiceApi.getMfaCode(payloadMfa).then((response) => {
            expect(response.status).to.eq(200); 
            //expect(response.body.data.length).to.eq(0);
            const mfaCode = response.body
            cy.log(mfaCode)

      });

     
    //   before(() => {
    //     const email = "repay.lift.automation@gmail.com"
    //     const payloadMfa = mockLoanServiceApi.payloadGenerator.generateMFAPayload(email)
    //     //cy.log(JSON.stringify(payloadMfa)) 

    //     mockLoanServiceApi.getMfaCode(payloadMfa).then((response) => {
    //         expect(response.status).to.eq(200); 
    //         expect(response.body.data.length).to.eq(0);
    //         mfaCode = response.body
    //       });
    // })
    
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
    
})