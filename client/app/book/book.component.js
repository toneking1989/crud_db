'use strict';

import routes from './book.routes';
import bookList from './list.component';
import factory from '../../components/factory/factory.service';
import filter from '../../components/filters/filters.filter';

class BookComponent {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }
}

export default angular.module('materialCrudMongoApp.book', [bookList, factory, filter])
  .config(routes)
  .component('book', {
    template: `
<navbar></navbar>
<md-content flex layout="column" class="content" md-no-flicker md-no-momentum>
<section layout="row">
    <div layout="column" flex>
      <book-list></book-list>
    </div>
    <md-content ng-show="$ctrl.$state.includes('book.detail')"
      ui-view
      id="detail-content"
      layout="column"
      flex-xs="100"
      flex-sm = "90"
      flex-md="90"
      flex-lg="66"
      flex-gt-lg="66"
      class="md-whiteframe-z1"
      md-no-flicker md-no-momentum>
    </md-content>
</section>
</md-content>
`,
    controller: BookComponent,
    bindings: { }
  })
  .name