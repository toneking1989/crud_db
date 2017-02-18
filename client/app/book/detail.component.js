'use strict';

class BooksDetailController {
/*@ngInject*/
  constructor($state, Toast, Modal, $stateParams, ToggleComponent, appConfig, $mdDialog, socket, $scope, Book, $http){
    'ngInject';
    var vm = this;
    vm.myDate = new Date();
    vm.header = 'Book';
    vm.$stateParams = $stateParams;
    vm.$mdDialog = $mdDialog;
    vm.$state = $state;
    vm.$http = $http;
    vm.Toast = Toast;
    vm.Modal = Modal;
    vm.ToggleComponent = ToggleComponent;
    vm.appConfig = appConfig;
    vm.Book = Book;
    vm.socket = socket;
    vm.api = 'book';
    vm.api2 = 'books';
    var fields = [
      {field: 'image', heading: 'Image', dataType: 'image'},
      {field: 'name', title: 'Title', dataType: 'text'},
      {field: 'author', dataType: 'array'},
      {field: 'category', dataType: 'select', options: ['Fiction', 'Non fiction', 'Inspirational', 'Novel', 'Science', 'Story']},
      {field: 'price', dataType: 'currency'},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'isbn', heading: 'ISBN', dataType: 'text', noEdit: true},
      {field: 'active', heading: 'Availability', dataType: 'boolean'}
    ];

    var obj = [];
    angular.forEach(fields, function(i){
        var o = {};
        // Extract sortType from dataType
        if(i.dataType==='numeric' || i.dataType==='number' || i.dataType==='float' || i.dataType==='integer' || i.dataType==='currency') {
          i.dataType = 'parseFloat';
          o.sortType = 'parseFloat';
        }else if(i.dataType==='date' || i.dataType==='calendar'){
          i.dataType = 'date';
          o.sortType = 'date';
        }else if(i.dataType==='link' || i.dataType==='ref'  || i.dataType==='href' || i.dataType==='hyperlink'){
          i.dataType = 'link';
          o.sortType = 'lowercase';
        }else if(i.dataType==='array' || i.dataType==='multi'  || i.dataType==='multiple'){
          i.dataType = 'array';
          o.sortType = 'lowercase';
        }else if(i.dataType==='dropdown' || i.dataType==='select' || i.dataType==='option'){
          i.dataType = 'dropdown';
          o.sortType = 'lowercase';
        }else if(i.dataType==='textarea' || i.dataType==='multiline'){
          i.dataType = 'textarea';
          o.sortType = 'lowercase';
        }else if(i.dataType==='image' || i.dataType === 'photo' || i.dataType==='picture'){
          i.dataType = 'image';
          o.sortType = 'lowercase';
        }else{
          o.sortType = 'lowercase';
        }
        // check heading (Assign heading if not exists)
        if('heading' in i) {
          o.heading = i.heading;
        }else if('title' in i){
          o.heading = i.title;
        }else{
          o.heading = i.field;
        }

        // Assign fields to object
        o.field = i.field;
        // o.sort = attrs.sort; // The field where the sort=true
        o.noSort = i.noSort;
        o.noAdd = i.noAdd;
        o.noEdit = i.noEdit;
        o.dataType = i.dataType;
        o.options = i.options;
        o.link = i.link;
        obj.push(o);
      });
      vm.columns = obj;
  }

  $onInit(){
    var vm = this;
    var bookId = vm.$stateParams.bookId;
    vm.loading = true;
    vm.$http.get('/api/'+vm.api2+'/'+bookId).then(function(res) {
      vm.loading = false;
      vm.book = res.data;
      // vm.socket.syncUpdates('book', vm.book);
    })
  }

  save(book) {
    var vm = this;
    // refuse to work with invalid data
    if(!book){
      vm.Toast.show({ type: 'error', text: 'No book defined.' });
      return;
    }
    vm.$http.put('/api/'+vm.api2+'/' + book._id, book).then(function(res) {
      vm.Toast.show({ type: 'success', text: 'Saved successfully' });
    }, function(err) {
      vm.Toast.show({ type: 'warn', text: 'Error while updating database' });
    });
  };
  
  handleError(error) { // error handler
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
  mediaLibrary(){
    var vm = this;
    vm.Modal.media()
    .then(function(answer) {
      vm.book.image = answer;
    }, function() {
    });
  }
}

export default angular.module('materialCrudMongoApp.bookDetail', [])
  .component('bookDetail', {
    template: require('./detail.html'),
    controller: BooksDetailController,
    controllerAs: 'detail',
    require: {'parent': '^book'}
  }).name;