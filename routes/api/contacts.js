const express = require("express");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .trim()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `"" must contain value`,
      "string.pattern.base": `"" must be 10 digit number`,
      "any.required": `"" is a required field`,
    }),
}).required();

const contactsOperation = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();

    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactsOperation.addContact(req.body);

    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    // res.status(204).json() - ничего не возвращает?
    res.json({
      status: "success",
      code: 204,
      message: "contact deleted",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactsOperation.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
