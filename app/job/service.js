import Ember from 'ember';

export default Ember.Service.extend({

  jobs: Ember.computed.setDiff('activeAndAssignedJobs', 'completedJobs'),
  activeAndAssignedJobs: Ember.computed.intersect('activeJobs', 'assignedJobs'),
  activeJobs: [],
  assignedJobs: [],
  completedJobs: [],
  selectedJob: '',
  statuses: ["En Route", "Arrived", "Completed"],
  canChangeStatus: true,

  currentStatus: Ember.computed.alias('selectedJob.status'),

  nextStatus: Ember.computed('currentStatus', 'statuses.[]', function() {
    let index = this.get('statuses').indexOf(this.get('currentStatus')) + 1;
    return this.get('statuses').objectAt(index);
  }),

  filterValue: "",

  filter: Ember.computed('jobs.[]', 'filterValue', function(){
    let jobs = this.get('jobs');
    let worker = this.get('currentUser.username');
    let filterValue = this.get('filterValue').toLowerCase();
    return jobs.filter(job => {
          if(job.record.get('location').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.record.get('status').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.record.get('category').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }

    });
  }),

  filteredJobs: Ember.computed.map('filter', function(job, index) {
    return job.record;
  }),

  selectJob(tableState) {
      debugger;
      this.set('selectedJob', tableState.selectedItems.objectAt(0));
      let job = this.get('selectedJob');
      tableState.selectedItems.clear();
  },

  changeStatus() {
    let job = this.get('selectedJob');
    job.set('status', this.get('nextStatus'));
    if(this.get('currentStatus') === "Completed") {
      this.set('canChangeStatus', false);
    }
    job.save();

  }



});
