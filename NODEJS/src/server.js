const express = require("express");
const bodyParser = require("body-parser");
const viewengine = require("./config/viewEngine");
const initWebRoutes = require("./route/web");
const cors = require('cors');
import connectDB from "./config/connectDB";
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewengine(app);
initWebRoutes(app);
connectDB();
const port = process.env.PORT || 6969;
app.listen(port, () =>
  console.log("Backend nodejs is running on the port " + port)
);
