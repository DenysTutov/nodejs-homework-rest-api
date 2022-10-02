const express = require('express');
const auth = require('../../controllers/auth');

const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

router.post(
  '/signup',
  validateBody(joiRegisterSchema),
  ctrlWrapper(auth.register)
);

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(auth.login));

module.exports = router;
