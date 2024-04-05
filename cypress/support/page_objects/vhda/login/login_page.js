const url = `${ Cypress.config().vhda.baseUrl }/login`;

export class LoginPage{

    open() {
        return cy.visit(url);
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

    login(userName,password){
      this.open();
      enterUserName(userName);
      enterPssword(password)
      this.clickLoginButton();
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

    }



