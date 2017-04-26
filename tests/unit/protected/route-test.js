import { moduleFor, test } from 'ember-qunit';

moduleFor('route:protected', 'Unit | Route | protected', {
  // Specify the other units that are required for this test.
  needs: ['service:job', 'service:worker']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
