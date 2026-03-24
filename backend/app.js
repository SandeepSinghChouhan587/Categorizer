require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
const connectDB = require("./config/db");
const { protect } = require('./middlewares/authMiddleware.js');
const { postLimiter, authLimiter, otpLimiter } = require('./middlewares/rateLimiter.js');

var app = express();
app.set("trust proxy", 1);

connectDB();

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`, 
  methods: ['GET', 'POST','DELETE'], 
  credentials: true 
};


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/auth",authLimiter,authRoutes);
app.use("/api/otp",otpLimiter,otpRoutes);
app.use("/api/user",protect,userRoutes);
app.use("/api/posts",protect,postLimiter, postRoutes);



module.exports = app;
