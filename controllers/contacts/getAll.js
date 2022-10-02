const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id } = req.user;

  const contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt');

  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts, quantity: contacts.length },
  });
};

module.exports = getAll;
