const { User } = require('../../models/user');
const {
  requserError,
  sendVerifyEmail,
  createVerifyMail,
} = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw requserError(404, 'Not found');
  }
  if (user.verify) {
    throw requserError(400, 'Verification has already been passed');
  }

  const mail = createVerifyMail(email, user.verificationToken);

  await sendVerifyEmail(mail);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendVerifyEmail;
