const env = require("dotenv");
env.config();

const generateEmailTemplate = (email, password) => {
  return `
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
};

module.exports = generateEmailTemplate;
