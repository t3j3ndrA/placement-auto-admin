const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const StudentRoute = require("./routes/student/student.route");
const AdminRoute = require("./routes/admin/admin.route");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// enviorment varibale configuration before using them in the code
env.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// express session with mongodb as storage
app.use(
  session({
    secret: process.env.SESSION_SECRETS,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 30, // keeping cookies for 30 seconds only
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
