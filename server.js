const express = require("express");
const app = express();
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
const indexRouter = require("./routes/index");
const menuRouter = require("./routes/menu");
const userRouter = require("./routes/user");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

//load config
require("dotenv").config({ path: "./config/config.env" });

//passport config
// require("./config/passport")(passport);
//loading
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware
app.use(express.static("public"));

//sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    // store: new MongoStore({ mongoUrl: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//
app.use(flash());

//router
app.use("/", indexRouter);
app.use("/menu", menuRouter);
app.use("/user", userRouter);
const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
