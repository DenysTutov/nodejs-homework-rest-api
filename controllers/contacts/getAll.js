const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner: _id, favorite },
    '-createdAt -updatedAt -owner',
    {
      skip,
      limit: Number(limit),
    }
  );

  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts, quantity: contacts.length },
  });
};

module.exports = getAll;
