import Ember from 'ember';

export default Ember.Service.extend({

  jobs: [],
  selectedJob: '',
  statuses: ["En Route", "Arrived", "Completed"],

  currentStatus: Ember.computed.alias('selectedJob.status'),

  nextStatus: Ember.computed('currentStatus', 'statuses.[]', function() {
    let index = this.get('statuses').indexOf(this.get('currentStatus')) + 1;
    return this.get('statuses').objectAt(index);
  }),

  filterValue: "",

  filteredJobs: Ember.computed('jobs.[]', 'filterValue', function(){
    let jobs = this.get('jobs');
    let worker = this.get('currentUser.username');
    let filterValue = this.get('filterValue').toLowerCase();
    return jobs.filter(job => {
        if(job.get('include')) {

          if(job.get('location').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.get('status').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.get('category').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }

          return true;

        }



      return false;
    });
  }),

  selectJob(tableState) {

      this.set('selectedJob', tableState.selectedItems.objectAt(0));
      let job = this.get('selectedJob');
      tableState.selectedItems.clear();
  },

  changeStatus() {
    this.get('selectedJob').set('status', this.get('nextStatus'));
    this.get('selectedJob').save();
  }



});
