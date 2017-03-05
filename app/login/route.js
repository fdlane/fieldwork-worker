import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    login(email, password) {
      localStorage['email'] = email;
      localStorage['password'] = password;
      this.get('session').open('firebase', {
        provider: 'password',
        email,
        password

      }).then(data => {
        for(var item in data['currentUser']){
          console.log("data['currentUser'][" + item + "] = " + data['currentUser'][item]);
        }
        localStorage['displayName'] = data['currentUser']['displayName'];
        localStorage['UID'] = data['currentUser']['uid'];

        this.transitionTo('protected').then(function (){
          window.location.reload(true);
        });
      });
    },

    forgotPassword() {

      this.transitionTo('password-reset');

    }
  }

});
