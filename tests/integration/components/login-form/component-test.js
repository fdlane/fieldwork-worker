import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('login action fires', function(assert) {

  this.loginAction = (username, password) => {
    assert.equal(username, 'username');
    assert.equal(password, 'password');
  };

  this.render(hbs`{{login-form login=(action loginAction)}}`);

  this.$('input[type=text]').val('username').change();
  this.$('input[type=password]').val('password').change();
  this.$('button').click();
});
