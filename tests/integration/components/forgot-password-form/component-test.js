import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forgot-password-form', 'Integration | Component | forgot password form', {
  integration: true
});

test('forgot password action fires', function(assert) {

  this.resetPasswordAction = (email) => {
    assert.equal(email, 'email');
  };

  this.render(hbs`{{forgot-password-form action=resetPasswordAction}}`);

  this.$('input[type=email]').val('email').change();

  this.$('button').click();
});
