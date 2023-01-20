const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const StudentRoute = require("./routes/student/student.route");
const AdminRoute = require("./routes/admin/admin.route");
const AuthRoute = require("./routes/auth/auth.route");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// enviorment varibale configuration before using them in the code
env.config();

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
      maxAge: 1000 * 60 * 5, // keeping cookies for 5 minutes alive
    },
  })
);

// server health check route
app.get("/api", (req, res) => {
  res.json({ msg: "server is up and running!" });
});

// routes
app.use("/api/student", StudentRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/auth", AuthRoute);

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
