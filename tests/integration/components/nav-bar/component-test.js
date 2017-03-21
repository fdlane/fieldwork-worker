import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('logout action fires', function(assert) {

  this.logoutAction = () => {
    assert.ok(true, "logout action fired");
  };

  this.render(hbs`{{nav-bar logout=(action logoutAction)}}`);

  this.$('span').click();
});
