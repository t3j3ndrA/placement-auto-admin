const generateEmailTemplate = require("./generateEmailTemplate");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const sendForgotPasswordEmail = async (email, password) => {
  const from = process.env.GMAIL_EMAIL;
  const to = email;
  const subject = "Forgot password : Placement portal credentials";
  const html = `
	<body style="background-color:rgb(230, 230, 230); padding : 10px;">
	<h2 style="color:rgb(30, 75, 83); text-align: center; ">
		DDU Placement Cell
	</h2>
	<p> Please use following credentials to login to ddu placement portal </p>
	<p> Email : ${email} </p>
	<p> Password : ${password} </p>
	<a href="https://ddu-placements.onrender.com/login" target="_blank">Login here </a>
	<p> Please do not share this credentials with anyone. </p>
	<br>
	
	</body>
	`;

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

module.exports = { sendForgotPasswordEmail };
