// getting express framework, in order to get simple request gestion
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");

const https = require("https");
const http = require("http");
const SimpleDataGen = require("./base/base");
const SimpleUserExpress = require("./users/user.utils");
const SimplePaiementExpress = require("./commands/payment_utils");
const fileUtils = require("./file_utils/index")("cloudinary");

const OnceUtils = require("./once/once.utils");
const middlewares = require("./utils/middlewares.utils");
const mongo = require("./mongodb/mongodb.utils");

function connectOk(req, res, next) {
  next();
}

const config = require("./config.js");
const adminComp = config.adminComponents;
const User = new SimpleUserExpress({
  type: "nosql",
  config: mongo
});
const paiement = new SimplePaiementExpress({
  type: "nosql",
  config: mongo
});

const app = express();
app.disable("x-powered-by");

// CORS
app.use(function(req, res, next) {
  if (req.headers.origin)
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.options("*", function(req, res) {
  res.send(200);
});

// ############ SECURITY ######
// ############################
app.use(express.static("./static/"));
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json({ json: { limit: "500mb", extended: true } }));
const MongoStore = require("connect-mongo")(session);
const host = process.env.MONGO_HOST;
const password = process.env.MONGO_PASSWORD;
const login = process.env.MONGO_LOGIN;
app.use(
  session({
    store: new MongoStore({url: `mongodb://${login}:${password}@${host}:27017/?authSource=admin`}),
    secret: process.env.COOKIESECRET,
    HttpOnly: true,
    resave: true,
    secure: false,
    saveUninitialized: true
  })
);

app.use("/admin", function(req, res, next) {
  if (process.env.STATUS === "dev") {
    req.session.connected = true;
    return next();
  }
  if (req.session.connected !== true) {
    console.log("error");
    throw new Error("Not connected");
  }
  next();
});

app.use("/", User.router);
app.use("/", paiement.router);

// ############# ONCE PATHS ########
// app.use('/', Navbar.router);
// app.use('/', Footer.router);

config.Onces.forEach(once => {
  let newOnce = new OnceUtils(once.name, once.entries);
  app.use("/", newOnce.router);
});
adminComp.forEach(comp => {
  let DataGen = new SimpleDataGen(
    {
      type: "nosql",
      config: mongo
    },
    middlewares.isAdmin,
    fileUtils,
    comp,
    connectOk
  );
  app.use("/", DataGen.router);
});
app.use(async (err, req, res, next) => {
  console.log("mainbaseerror", err);
  await res.status(500).send({ status: 500, message: err.message });
  next(err);
});

// if (process.env.STATUS === 'dev') {
//     http.createServer(app).listen(process.env.SERVER_HTTP_PORT, function(data, err) {
//         console.log(`server started on ${process.env.SERVER_HTTP_PORT}`, data, err);
//     });;
// }
console.log(`server started on ${process.env.SERVER_HTTP_PORT}`);
app.listen(process.env.SERVER_HTTP_PORT);
