const default_header = require('../../fixtures/default_header.json')
const x_auth_token_header = require('../../fixtures/x_auth_token_header.json')

export class AuthenticationUtils {
    updateHeaderAuthorization(type, token) {
        if (type === 'x-auth') {
            this.headers = x_auth_token_header;
            this.headers[ 'x-auth-token-headers' ] = token;
        } else {
            this.headers = default_header;
            this.headers.Authorization = `${ type } ${ token }`;
        }

        return this.headers;
    }

    getAuthToken(token) {
        return token ? token : window.sessionStorage.getItem('session_auth_token');
    }
}