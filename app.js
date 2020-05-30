var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const passport = require("passport");
const config = require("./config/configPassport");

const indexRouter = require("./routes/index");
const entertainmentRouter = require("./routes/entertainment");
const businessRouter = require("./routes/business");
const socialRouter = require("./routes/social");
const lawRouter = require("./routes/law");
const worldRouter = require("./routes/world");
const sportRouter = require("./routes/sport");
const armyRouter = require("./routes/army");
const healthRouter = require("./routes/health");
const lifeStyleRouter = require("./routes/lifeStyle");
const detailRouter = require("./routes/detail");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");

const { autoUpdateDB } = require("./services/serviceDB/update");
const connectDatabase = require("./services/serviceDB/connect");
connectDatabase();

/*Start service auto update database*/
console.log("Start service auto update database !!");
autoUpdateDB();

const handlebars = require("handlebars");
const registerAll = require("./HandlebarsRegister/register");
registerAll(handlebars);

var expressHbs = require("express-handlebars");

var app = express();
app.use(compression());

config(app, passport);
// view engine setup
app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/entertainment", entertainmentRouter);
app.use("/business", businessRouter);
app.use("/social", socialRouter);
app.use("/life-style", lifeStyleRouter);
app.use("/law", lawRouter);
app.use("/sport", sportRouter);
app.use("/health", healthRouter);
app.use("/army", armyRouter);
app.use("/world", worldRouter);
app.use("/detail", detailRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
