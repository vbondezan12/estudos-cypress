
describe('Google', () => {
    
    it('open google', () => {
        //variaveis

        //execução
        cy.viewport(1280, 720)
        cy.visit('https://www.google.com.br/')        
        cy.get("[id='APjFqb']").type('uol').type('{enter}')
        //validação
        

    });

})