const express = require("express");
const app = express();

const port = 5000;

app.get("/api", (req, res) => {
  res.json({ msg: "server is up and running!" });
});

app.listen(port, () => {
  console.log("listening on port  : " + port);
});
