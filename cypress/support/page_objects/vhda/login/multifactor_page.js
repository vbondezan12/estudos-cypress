import { LoginPage } from '../../../../support/page_objects/vhda/login/login_page';
import { CLIENT } from '../../../../config/constants';
import { MockLoanServiceApi } from '../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LOAN_STATUS } from '../../../../config/constants';
import { faker } from '@faker-js/faker';

describe('MFA Tests', { tags: [ '@Login', '@regression' ] }, () => {
    let loginPage = new LoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    let testCredential;
    let mfaCode;

})