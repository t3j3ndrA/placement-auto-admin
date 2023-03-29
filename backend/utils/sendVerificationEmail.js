const generateEmailTemplate = require("./generateEmailTemplate");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const sendVerificationEmail = async (email, password) => {
  const from = process.env.GMAIL_EMAIL;
  const to = email;
  const subject = "Placement portal credentials";
  const html = generateEmailTemplate(email, password);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  let mailOptions = {
    from,
    to,
    subject,
    html,
  };

  try {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log("in sending mail >> ", err);
      }
    });
  } catch (err) {
    console.log("in sending mail >> ", err);
  }
};

module.exports = { sendVerificationEmail };
