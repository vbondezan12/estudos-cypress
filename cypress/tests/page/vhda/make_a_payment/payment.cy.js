import { faker } from '@faker-js/faker';
import { MakePayment } from '../../../../support/page_objects/vhda/make_a_payment/payment';

describe('VHDA', () => {
  describe('Make A Payment', () => {
    const makePayment = new MakePayment();

    beforeEach(() => {
      cy.vhdaLogin();
      makePayment.open();
    });

    it('VEN-15594_vhda_make_a_payment_with_valid_ach_account', { tags: '@smoke' }, function () {
      const name = faker.person.fullName();
      const nickName = faker.person.firstName();

      // TODO: use microbilt API
      let routingNumber = '053200983';
      let accountNumber = '11101010';

      makePayment.open();
      makePayment.clickNewPayAccountButton();

      // eslint-disable-next-line
      cy.wait(1000); // it's necesary for system can type the full routing number in the field.

      makePayment.enterRoutingNumber(routingNumber);
      makePayment.enterAccountNumber(accountNumber);
      makePayment.enterName(name);
      makePayment.enterNickName(nickName);
      makePayment.clickAddButton();
    });
  });
});



