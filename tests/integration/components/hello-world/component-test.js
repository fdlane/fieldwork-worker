import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hello-world', 'Integration | Component | hello world', {
  integration: true
});

test('headers render propertly', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hello-world}}`);

  assert.equal(this.$('#createdBy').text(), 'Created By');
  assert.equal(this.$('#createdDate').text(), 'Created Date');
  assert.equal(this.$('#editedBy').text(), 'Edited By');
  assert.equal(this.$('#editedDate').text(), 'Edited Date');
  assert.equal(this.$('#location').text(), 'Location');
  assert.equal(this.$('#metaId').text(), 'MetaId');
  assert.equal(this.$('#scheduleDate').text(), 'Schedule Date');
  assert.equal(this.$('#assignedTo').text(), 'Assigned To');

});
