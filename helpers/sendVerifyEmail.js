const sgMail = require('@sendgrid/mail');
const { requestError } = require('./requestError');

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerifyEmail = async data => {
  try {
    const mail = { ...data, from: SENDGRID_FROM };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw requestError(error.status, error.message);
  }
};

module.exports = sendVerifyEmail;
