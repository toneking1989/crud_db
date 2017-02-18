'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.post('/', controller.create);
router.post('/forgot', controller.forgot);
router.post('/reset/:token', controller.reset);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);


module.exports = router;
