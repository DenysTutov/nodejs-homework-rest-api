const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { randomUUID } = require('crypto');

const { User } = require('../../models/user');
const {
  requestError,
  sendVerifyEmail,
  createVerifyMail,
} = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, 'Email in use');
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = randomUUID();

  const result = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const mail = createVerifyMail(email, verificationToken);

  await sendVerifyEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: { email, subscription: result.subscription, avatarURL },
    },
  });
};

module.exports = register;
