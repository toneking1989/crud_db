'use strict';

import modal from '../../components/modal/modal.service';
import filters from '../../components/filters/filters.filter';
import bookDetail from './detail.component';
import listImage from '../../components/list-image/';
import ngInfiniteScroll from 'ng-infinite-scroll';

class BooksListController {

  constructor($scope, socket, $state, $mdDialog, $stateParams, Modal, Toast, $http, appConfig) {
    '@ngInject';
    var vm = this;
    vm.$mdDialog = $mdDialog;
    vm.$stateParams = $stateParams;
    vm.Modal = Modal;
    vm.$http = $http;
    vm.Toast = Toast;
    vm.socket = socket;
    vm.appConfig = appConfig;
    vm.$state = $state;
    vm.cols = [
      {field: 'image', heading: 'image'},
      {field: 'name', heading: 'Title'},
      {field: 'author', heading: 'Author'},
      {field: 'active', heading: 'active'}
    ];
    vm.l = 10;
    vm.header = 'Book';
    vm.sort = {};
    vm.sort.predicate = 'name';
    vm.sort.reverse = false;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('book');
    });
  }

  $onInit(){
    var vm = this;
    vm.loading = true;
    vm.$http.get('/api/books').then(function(res) {
      vm.loading = false;
      vm.data = res.data;
      vm.socket.syncUpdates('book', vm.data);
    });
  }
  loadMore(){
    this.l = this.l+10;
    console.log('wwwwwwwwwwwwwwwwwwwwww',this.l);
  }
  create(){
    var options = {api:'book'};
    var cols = [{field: 'name', heading: 'Name'}, {field: 'info', heading: 'info', dataType: 'textarea'}];
    this.Modal.create(cols, options);
  }
  order(predicate) {
    var vm = this;
    vm.sort.reverse = (vm.sort.predicate === predicate) ? !vm.sort.reverse : false;
    vm.sort.predicate = predicate;
  };
  loadMore(){
    this.l += 2;
  };
  openMenu($mdOpenMenu, ev) {
    var originatorEv;
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  
  isSelected(book) {
    var _id = null;
    return _id === book._id;
  };

  changeStatus(x){
    var vm = this;
      vm.$http.put('/api/books/' + x._id, {active: x.active}).then(function() {
      },function(err){
        vm.handleError(err, vm)
      });
  };

  delete(data) {
    var vm = this;    
    var confirm = vm.$mdDialog.confirm()
    .title('Would you like to delete the book completely?')
    .textContent('All its details will be deleted as well')
    .ariaLabel('Confirm delete book')
    .ok('Please do it!')
    .cancel('No. keep')

    vm.$mdDialog.show(confirm).then(function() {
      vm.$http.delete('/api/books/' + data._id).then(function() {},
      function(err){
        vm.handleError(err, vm)
      });
    })
  };

  handleError(error){ // error handler
    var vm = this;
    vm.loading = false;
    if(error.status === 403){
      vm.Toast.show({
        type: 'error',
        text: 'Not authorised to make changes.'
      });
    }
    else{
      vm.Toast.show({
        type: 'error',
        text: error.status
      });
    }
  }

  gotoDetail(params){
    var vm = this;
    vm.$state.go('book-details', {id:params._id, slug:params.slug}, {reload: false});
  }
}


export default angular.module('materialCrudMongoApp.bookList', [bookDetail, listImage, modal, filters, ngInfiniteScroll])
  .component('bookList', {
    template: require('./list.html'),
    controller: BooksListController,
    controllerAs: 'list'
  }).name;