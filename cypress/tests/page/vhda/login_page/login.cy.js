import { LoginPage } from '../../../../support/page_objects/vhda/login/login_page';
import { CLIENT } from '../../../../config/constants';
import { MockLoanServiceApi } from '../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LOAN_STATUS } from '../../../../config/constants';
import { faker } from '@faker-js/faker';

describe('Login Tests', { tags: [ '@Login', '@regression' ] }, () => {
    //Variables
    let loginPage = new LoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    let testCredential;
    let mfaCode;

    //Method to get the credentials of login in API (endpoint 'Test Credential/Lookup')
    before(() => {
        const testPayload = mockLoanServiceApi.payloadGenerator.generateTestCredentialsLookupPayload(CLIENT.VHDA, LOAN_STATUS.CURRENT) // variable testPayload save the request body of endpoint 'Test Credential/lookup', that is, the json with the data necessary to make a request of mentioned endpoint. 
        mockLoanServiceApi.getTestLoans(testPayload).then((response) => { // method getTestLoans receive the payload (json with data necessary to make a get call), and with this payload (json) the method execute (run) a request that return a list with userS created by endpoint 'Test Credential/Create'.
            testCredential = response.body[2] // the variable 'testCredential' save the position two of the response (result) list of the request made in the above code line. This list contem differents json files with datas related with credetials created to login in VHDA webpay qa app. 
            cy.log(testCredential); // only to print the variable
            cy.log(JSON.stringify(testCredential))  // only to print the variable
          });
    })

      
    //------------Tests of Login Page----------------
     
    //Happy Path
    it('Login with valid credentials (Happy Path)', { tags: '@smoke' }, function () { // Name of the test case

        //Variables used to do a login in VHDA webpay of qa enviroment
        const userName = testCredential.username; //the variable userName save the value associate with username field of the second json that we have inseide the testCredential list. List that is a response of getTestLoans
        const password = testCredential.password; 
                
        //Test execution. Methods to execute the tasks in the page are called here
        loginPage.openPage();   
        loginPage.enterUserName(userName);
        loginPage.enterPassword(password);   
        loginPage.clickLoginButton();
        
        //Test validation. Here we validate if the next page after click in Login button contem the follow link 
        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

        
        //-------Tests of MFA Page-------

        //time necessary to wait the endpoint (API) update the mfa code, then the code can take the updated mfa code
        cy.wait(50000)
        
        // Get MFA code from API, that is, endpoint 'Test Credential/VHDA Last MFA Token'
        const email = "priscillaufpa@gmail.com" // email used to do login 
        const payloadMfa = mockLoanServiceApi.payloadGenerator.generateMFAPayload(email) // The method 'generateMFAPayload' create a payload (json file) with the email saved in bellow variable. This email is the same inserted in the body of the API request. 
        mockLoanServiceApi.getMfaCode(payloadMfa).then((response) => { // the method getMfaCode make a request using the payloadMfa (json)
            //variable to use in the execution of tests
            mfaCode = response.body // the variable 'mfaCode' save the response/result of above request. this .body is the body of response not of request. 
            expect(response.status).to.eq(200); //this line verify if the answer of request (get) is equal to 200, that is, if the endpoint did work.
            cy.log(mfaCode);//only to verify the variable value
       
        //Test execution
        loginPage.enterMFACode(mfaCode);
        loginPage.clickAuthenticateButton();

         //Test validation
         cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }`);

      });
    
})

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
    
