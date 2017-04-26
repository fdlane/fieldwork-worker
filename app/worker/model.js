import DS from 'ember-data';

export default DS.Model.extend({

  availableDate: DS.attr('string'),
  username: DS.attr('string'),
  createdBy: DS.attr('string'),
  displayName: DS.attr('string'),
  editedBy: DS.attr('string'),
  isAvailable: DS.attr('boolean'),
  jobCount: DS.attr('number'),
  isActive: DS.attr('boolean')

});
