import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-row', 'Integration | Component | job row', {
  integration: true
});


test('toggleModal action fires', function(assert) {

  this.toggleModalAction = () => {
    assert.ok(true);
  };

  this.render(hbs`{{job-row action=toggleModalAction}}`);

  this.$('tr').click();
});
