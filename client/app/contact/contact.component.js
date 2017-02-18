'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './contact.routes';

export class ContactComponent {
  /*@ngInject*/
  constructor() {
    this.fields = [
      {field: 'photo', dataType: 'image'},
      {field: 'name', noEdit: true},
      {field: 'email'},
      {field: 'phone'},
      {field: 'category', dataType: 'select', options: ['Family', 'Friends', 'Acquaintances', 'Services']},
      {field: 'active', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudMongoApp.contact', [uiRouter])
  .config(routes)
  .component('contact', {
    template: require('./contact.html'),
    controller: ContactComponent
  })
  .name;
