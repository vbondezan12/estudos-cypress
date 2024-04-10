const url = `${ Cypress.config().vhda.baseUrl }/login`;
const urlMultifactorPage = `${ Cypress.config().vhda.baseUrl }/multifactor/new`;

export class LoginPage{

    open() {
        return cy.visit(url);
      }
    secondOpen() {
        return cy.visit(urlMultifactorPage);
      }
    get userNameInput() {
        return cy.get('#user_username');
      }   
    get passwordInput() {
        return cy.get('#user_password');
      } 
      
    get loginButton() {
        return cy.get('.btn');
      } 

    get toastMessage() {
        return cy.get('.toast-message');
      }

    get errorMessage() {
        return cy.get('.card-body');
      }

    get multifactorToken() {
        return cy.get('#multifactor_token_token');
      }  
      
    get authenticateButton() {
        return cy.get('.btn');
      }

    login(userName,password,mfa){
      this.open();
      enterUserName(userName);
      enterPssword(password);
      this.clickLoginButton();
      this.openMultifactorPage
      this.enterMFACode(mfa)
      this.clickAuthenticateButton();
    }

     openPage(){
        this.open();
      }

     enterUserName(userName){
      this.userNameInput.type(userName)
     }
  
     enterPassword(password){
      this.passwordInput.type(password)
     }
  
     clickLoginButton(){
      this.loginButton.click();
     }

     openMultifactorPage(){
      this.secondOpen();
    }

     enterMFACode(mfaCode){
      this.multifactorToken.type(mfaCode)
     }

     clickAuthenticateButton(){
      this.authenticateButton.click();
     }

    }



