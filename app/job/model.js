import DS from 'ember-data';

export default DS.Model.extend({
    assignedTo: DS.attr('string'),
    createdBy: DS.attr('string'),
    editedBy: DS.attr('string'),
    editedDate: DS.attr('string'),
    location: DS.attr('string'),
    metaId: DS.attr('string'),
    isActive: DS.attr('boolean'),
    description: DS.attr('string'),
    createdDate: DS.attr('string'),
    contactInfo: DS.attr('string'),
    category: DS.attr('string'),
    scheduleDate: DS.attr('string'),
    status: DS.attr('string'),
    jobImage: DS.attr('string'),
});
