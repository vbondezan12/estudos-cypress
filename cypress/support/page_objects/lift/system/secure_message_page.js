const url = `${Cypress.config().lift.baseUrl}/system/secure_messages`;


export class SecureMessageCenter {

    get loanNumber() {
        return cy.get('#loan_number')        
    }

    get searchButton() {
        cy.get('.button');        
    }

    get unreadMessage() {
        cy.get('.unread_row:nth-child(1) > td:nth-child(1)');
    }

    // cy.get('#loan_number').type('130053');
    // cy.get('.button').click();
    // cy.get('#search').submit();
    // cy.url().should('contains', 'https://lift-qa.secureconduit.net/system/secure_messages');
    // cy.get('.unread_row:nth-child(1) > td:nth-child(1)').click();
}