import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('userEmail and userPassword take user input', function(assert) {

  this.render(hbs`{{login-form}}`);

  this.$('#userEmail').val('jane.doe@gmail.com');
  this.$('#userEmail').change();

  assert.equal(this.$('#userEmail').val(), 'jane.doe@gmail.com');

  this.$('#userPassword').val('password');
  this.$('#userPassword').change();

  assert.equal(this.$('#userPassword').val(), 'password');

});
