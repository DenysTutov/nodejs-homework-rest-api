const express = require('express');
const ctrl = require('../../controllers/user');
const { auth } = require('../../middlewares');

const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

router.post(
  '/signup',
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
