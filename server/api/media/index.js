'use strict';

import {Router} from 'express';
import * as controller from './media.controller';
import * as auth from '../../auth/auth.service';

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var router = new Router();

router.use(multiparty({ uploadDir: './client/uploads' }));



router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.post('/profile', auth.isAuthenticated(), multipartyMiddleware, controller.updateProfile);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
