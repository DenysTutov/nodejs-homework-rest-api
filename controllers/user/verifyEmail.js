const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw requestError(404, 'Not found verification token');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.json({ message: 'Verification successful' });
};

module.exports = verifyEmail;
