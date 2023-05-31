const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
const path = require("path");
var router = express.Router();
const session = require("express-session");
const StudentRoute = require("./routes/student/student.route");
const AdminRoute = require("./routes/admin/admin.route");
const AuthRoute = require("./routes/auth/auth.route");
const CompanyRoute = require("./routes/company/company.route");
const ReportsRoute = require("./routes/reports/reports.route");
// const TrashRoute = require("./routes/trash/trash.route");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const verifyStudent = require("./middleware/verifyStudent");
const verifyAdmin = require("./middleware/verifyAdmin");
const verifyLoggedIn = require("./middleware/verifyLoggedIn");

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
      maxAge: 1000 * 60 * 60 * 10, // keeping cookies for 10 hours alive
    },
  })
);

app.use(express.static(path.join(__dirname, "sheets"), { index: false }));

app.get("/api", (req, res) => {
  res.json({ msg: "server is up and running!" });
});

app.use("/api/auth", AuthRoute);
// app.use("/api/student", verifyStudent, StudentRoute);
app.use("/api/student",StudentRoute);
app.use("/api/admin" ,AdminRoute);
app.use("/api/company",CompanyRoute);
app.use("/api/reports", verifyAdmin,ReportsRoute);

app.get("/get-session", (req, res) => {
  res.json(req.session.isAuth);
});

if (process.env.NODE_ENV === "production") {
  // serving admin builds
  app.use(
    express.static(path.join(__dirname, "..", "admin-front", "build"), {
      index: false,
    })
  );
  // serving students builds
  app.use(
    express.static(path.join(__dirname, "..", "student-front", "build"), {
      index: false,
    })
  );

  // only student login is visible without login
  app.get("/Login", (req, res) => {
    return res.sendFile(
      path.join(__dirname, "..", "student-front", "build", "index.html")
    );
  });

  // only admin login is visible without login
  app.get("/admin/login", (req, res) => {
    return res.sendFile(
      path.join(__dirname, "..", "admin-front", "build", "index.html")
    );
  });

  // admin protected routes
  app.get("/admin/*", verifyAdmin, (req, res) => {
    return res.sendFile(
      path.join(__dirname, "..", "admin-front", "build", "index.html")
    );
  });

  // student protected routes
  app.get("/*", verifyStudent, (req, res) => {
    return res.sendFile(
      path.join(__dirname, "..", "student-front", "build", "index.html")
    );
  });
}
// db connections
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => console.log("error >> ", error));

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port  : " + port);
});
