const api_headers = require ('../../../fixtures/vhda_api_headers.json')

const url = Cypress.config().Vhda.base_url;

export class VhdaApi{

    updateHeaders(jwt) {
        if(jwt) {
            this.headers = api_headers;
            this.headers.Authorization = this.headers.Authorization.replace('ACCESS_TOKEN', jwt);
        }
    }

    createJwt(login_payload) {

        return cy.request({
            method: 'POST',
            url: url + `/user_token`,
            failOnStatusCode: false,
            headers: this.headers,
            body: login_payload
        }).then((response) => {
            cy.wrap(response.body.jwt).as('jwt');
        });

    }

    getAccounts(jwt) {
        if(jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + `/accounts`,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

}