const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const add = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.phone) {
    throw RequestError(400, "missing fields");
  }

  const result = await Contact.create(req.body);

  res.status(201).json({ status: "success", code: 201, data: { result } });
};

module.exports = add;
