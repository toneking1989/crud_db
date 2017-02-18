'use strict';

class PasswordController {
  constructor(Auth, $state, $http) {
    this.user = {};
    this.user.email = $state.params.email;
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }
  // changePassword(form) {
  //   this.submitted = true;

  //   if(form.$valid) {
  //     this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
  //       .then(() => {
  //         this.message = 'Password successfully changed.';
  //       })
  //       .catch(() => {
  //         form.password.$setValidity('mongoose', false);
  //         this.errors.other = 'Incorrect password';
  //         this.message = '';
  //       });
  //   }
  // }
  reset(form) {
    this.submitted = true;

    if (form.$valid) {
      this.loading = true;
      this.user.token = this.$state.params.token;
      this.$http.post('api/users/reset/'+this.$state.params.token, this.user)
      .then((data) => {
        this.errors.message = data.data.message;
        this.errors.email = '';
        this.loading = false;
      })
      .catch(err => {
        this.errors.message = '';
        this.errors.email = err.data.message;
        this.loading = false;
      });
    }
  }

  forgot(form) {
    this.submitted = true;

    if (form.$valid) {
      this.loading = true;
      this.$http.post('api/users/forgot', this.user)
      .then((data) => {
        this.errors.message = data.data.message;
        this.errors.email = '';
        this.loading = false;
      })
      .catch(err => {
        this.errors.message = '';
        this.errors.email = err.data.message;
        this.loading = false;
      });
    }
  }
}

export default angular.module('materialCrudMongoApp.password', [])
  .controller('PasswordController', PasswordController)
  .name;
