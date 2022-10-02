const express = require('express');

// contacts controllers
const ctrl = require('../../controllers/contacts');

// try-catch wrapper
const { ctrlWrapper } = require('../../helpers');

// validate request body and ID
const { auth, validateBody, isValidId } = require('../../middlewares');

// Joi validate Schema
const { joiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  '/',
  auth,
  validateBody(joiSchema.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  '/:contactId',
  auth,
  isValidId,
  validateBody(joiSchema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateBody(joiSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
