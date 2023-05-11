import nodemailer from 'nodemailer';
import config from '../config/email.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.pass,
  },
});

export async function sendEmailActivateAccount(url, email) {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: 'Activate Account',
    html: `<h2 style="color: #00d3c1">Food Delivery</h2>
          <h3>Thank you for registration</h3>
          <h3>To finish registration please open the link <a href="${url}"> activate account </a></h3>`
  };
  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export async function sendEmailForgotPass(url, email) {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: 'Forgot password',
    html: `<h2 style="color: #00d3c1">Food Delivery</h2>
          <h3>To reset your password open the link <a href="${url}"> reset password </a></h3>`
  };
  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
