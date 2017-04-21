import Ember from 'ember';

export default Ember.Component.extend({

  jobService: Ember.inject.service('job'),

  columns: [
    {
      "propertyName": "metaId",
      "title": "Id",
    },

    {
      "propertyName": "location",
      "title": "Location",
    },

    {
      "propertyName": "status",
      "title": "Status",
    },

    {
      "propertyName": "category",
      "title": "Category",
    },

    {
      "propertyName": "scheduleDate",
      "title": "Scheduled",
    },

    {
      "propertyName": "createdDate",
      "title": "Created",
    }
  ],

  tableClasses: Ember.Object.create({
    "table": "table  table-bordered",

  }),


  actions: {
    selectJob(table) {

      let row = Ember.$(event.target).parent();

      if(".modal" !== row.attr('data-target')) {
        row.attr("data-toggle",'modal');
        row.attr("data-target", '.modal');
      }

      this.get('jobService').selectJob(table);
    },
  }
});
