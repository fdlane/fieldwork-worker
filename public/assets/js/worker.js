function FieldworkWorker() {

};

FieldworkWorker.prototype.initFielworkWorker = function(email, password) {
  this.checkSetup();
  this.initFirebase(email, password);
  this.jobList = document.getElementById('jobList');
  this.userHeader = document.getElementById('userHeader');
  this.userHeader.innerHTML = "Jobs for " + localStorage.displayName;
  this.loadJobs();
};

FieldworkWorker.prototype.initFirebase = function(email, password) {
  this.auth = firebase.auth();
  this.auth.signInWithEmailAndPassword(email, password);
  this.database = firebase.database();
  this.storage = firebase.storage();
};

FieldworkWorker.JOB_TEMPLATE =
  '<li style="padding: 0.7em">' +
    '<a class="job-container btn btn-primary" style="padding:0.7em;width: 300px; margin: auto;">' +
      '<div class="createdBy"></div>' +
      '<div class="scheduleDate"></div>' +
      '<div class="location"></div>' +
    '</a>' +
    '</li>';

FieldworkWorker.prototype.loadJobs = function() {
  this.jobsRef = this.database.ref('jobs');
  this.jobsRef.off();

  var setJob = function(data) {
    var val = data.val();
    this.displayJob(data.key, val.createdBy, val.scheduleDate, val.location, val.assignedTo);
  }.bind(this);

  var removeJob = function(data){
    var val = data.val();
    var listItem = document.getElementById(data.key);
    listItem.parentNode.removeChild(listItem);
  }.bind(this);

  var jobLoadError = function (errorObject) {
    console.log("Job read failed: " + errorObject.code);
  };

  this.jobsRef.on('child_added', setJob, jobLoadError);
  this.jobsRef.on('child_changed', setJob, jobLoadError);
  this.jobsRef.on('child_removed', removeJob, jobLoadError);
};

FieldworkWorker.prototype.displayJob = function(key, createdBy, scheduleDate, location, assignedTo) {
  //console.log(assignedTo);
  var listItem = document.getElementById(key);
  if (!listItem) {
    var container = document.createElement('li');
    container.innerHTML = FieldworkWorker.JOB_TEMPLATE;
    listItem = container.firstChild;
    listItem.setAttribute('id', key);
    this.jobList.appendChild(listItem);
  }
  if(scheduleDate === undefined)
    scheduleDate = "N/A";

  listItem.querySelector('.createdBy').textContent = "Created by: " + createdBy;
  listItem.querySelector('.scheduleDate').textContent = "Schedule Date: " + scheduleDate;
  listItem.querySelector('.location').textContent = "Location: " + location;

  setTimeout(function() {listItem.classList.add('visible')}, 1);
  this.jobList.scrollTop = this.jobList.scrollHeight;
};

FieldworkWorker.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ');
  } else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

window.onload = function() {
  window.fieldworkWorker = new FieldworkWorker();
};
