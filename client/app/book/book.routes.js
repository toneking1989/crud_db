'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('book', {
      url: '/book',
      template: '<book></book>'
    })
    .state({ 
      name: 'book.detail', 
      url: '/detail/{bookId}', 
      template: '<book-detail></book-detail>'
    });
}
