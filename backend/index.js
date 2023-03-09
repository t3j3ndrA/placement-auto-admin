const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
var router = express.Router();
const session = require("express-session");
const StudentRoute = require("./routes/student/student.route");
const AdminRoute = require("./routes/admin/admin.route");
const AuthRoute = require("./routes/auth/auth.route");
const CompanyRoute = require("./routes/company/company.route");
// const TrashRoute = require("./routes/trash/trash.route");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const verifyStudent = require("./middleware/verifyStudent");
const verifyAdmin = require("./middleware/verifyAdmin");

// enviorment varibale configuration before using them in the code
env.config();

// server health check route

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// express session with mongodb as storage
app.use(
  session({
    secret: process.env.SESSION_SECRETS,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 5, // keeping cookies for 5 hours alive
    },
  })
);

app.get("/api", (req, res) => {
  res.json({ msg: "server is up and running!" });
});

app.use("/api/auth", AuthRoute);
// app.use("/api/student", verifyStudent, StudentRoute);
app.use("/api/student", StudentRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/company", CompanyRoute);

// trash routes only under developments
// app.use("/api/trash", TrashRoute);
///////////////////////////////////////
app.get("/get-session", (req, res) => {
  res.json(req.session.isAuth);
});

// db connections
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => console.log("error >> ", error));

// starting server
const port = process.env.PORT | 5000;
app.listen(port, () => {
  console.log("listening on port  : " + port);
});
