import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-details-modal', 'Integration | Component | job details modal', {
  integration: true
});


test('renders', function(assert) {

  this.render(hbs`{{job-details-modal}}`);

  assert.ok(true);
});
