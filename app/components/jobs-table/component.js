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
      this.get('jobService').selectJob(table);
    },
  }
});
