import { moduleFor, test } from 'ember-qunit';

moduleFor('service:job', 'Unit | Service | job', {
  // Specify the other units that are required for this test.
  needs: ['service:firebaseApp']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
