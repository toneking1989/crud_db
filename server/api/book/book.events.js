/**
 * Book model events
 */

'use strict';

import {EventEmitter} from 'events';
import Book from './book.model';
var BookEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Book.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BookEvents.emit(event + ':' + doc._id, doc);
    BookEvents.emit(event, doc);
  };
}

export default BookEvents;
