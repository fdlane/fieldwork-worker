import Ember from 'ember';

export default Ember.Service.extend({

  jobs: [],
  selectedJob: Ember.computed.alias('tableState.selectedItems.firstObject'),
  hasSelectedJob: Ember.computed.notEmpty('selectedJobs'),
  statuses: ["Pending", "En Route", "Arrived", "Completed"],

  buttonText: "",

  filterValue: "",

  filteredJobs: Ember.computed('jobs.[]', 'filterValue', function(){
    let jobs = this.get('jobs');
    let filterValue = this.get('filterValue').toLowerCase();
    return jobs.filter(job => {
      if(job.get('location').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }
      if(job.get('status').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }
      if(job.get('category').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }

      return false;
    });
  }),

  selectJob(tableState) {

      this.set('tableState', tableState);
      let job = this.get('selectedJob');
      let currentStatus = job.get('status');

      this.set('buttonText', currentStatus);
      let metaId = job.get('metaId');
      this.set('metaId', metaId);
  },

  assignJob() {

    let selectedWorker = this.get('workerService.selectedWorkers.firstObject');

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', selectedWorker.get('username'));
      job.set('status', 'Acknowledged');
      job.save();

    });

    this.get('selectedJobs').clear();

  },



});
