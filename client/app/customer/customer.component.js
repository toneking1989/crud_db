'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customer.routes';

export class CustomerComponent {
  /*@ngInject*/
  constructor() {
    this.fields = [
      {field: 'photo', heading: 'Image', dataType: 'image'},
      {field: 'name', noSort: true, noEdit: true},
      {field: 'address', dataType: 'textarea'},
      {field: 'country', dataType: 'select', options: ['India', 'USA', 'Australlia', 'China', 'Japan']},
      {field: 'active', heading: 'Status', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudMongoApp.customer', [uiRouter])
  .config(routes)
  .component('customer', {
    template: require('./customer.html'),
    controller: CustomerComponent
  })
  .name;
