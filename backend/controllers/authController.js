const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const { default: mongoose } = require("mongoose");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Generate JWT
const generateToken = (id)=>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn:"7d"
  });
};



// REGISTER


const register = async (req,res)=>{

  const {name,email,password} = req.body;

  try{

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"Email already exists"});
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random()*900000).toString();

    // hash OTP
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp,salt);

    const savedOtp = await Otp.create({
      email:email,
      otpHash:otpHash
    });

    // create temporary token with user data
    const tempToken = jwt.sign(
      {
        name,
        email,
        password,
        otpExpiry: Date.now() + 5*60*1000
      },
      process.env.JWT_SECRET,
      {expiresIn:"5m"}
    );

    // send OTP email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email, // recipient
  from: process.env.EMAIL_USER, // verified sender
  subject: "Your OTP Verification Code",
  html: `
    <h2>Email Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP expires in 5 minutes.</p>
  `,
};

await sgMail.send(msg);

    res.status(200).json({
      message:"OTP sent to email",
      requiresVerification:true,
      tempToken
    });

  }catch(error){
    console.log("REGISTER ERROR:",error);
    res.status(500).json({message:error.message});
  }

};



const verifyOtp = async (req,res)=>{

  const {otp,tempToken} = req.body;


  try{

    // decode temporary token
    const decoded = jwt.verify(tempToken,process.env.JWT_SECRET);

    // check expiry
    if(Date.now() > decoded.otpExpiry){
      return res.status(400).json({message:"OTP expired"});
    }

    // compare OTP
    const email = decoded.email
    const storedOtp = await Otp.findOne({email});
    const isValid = await bcrypt.compare(otp,storedOtp.otpHash);
     
    if(!isValid){
      return res.status(400).json({message:"Invalid OTP"});
    }

    // create user after verification
    const user = await User.create({
      name:decoded.name,
      email:decoded.email,
      password:decoded.password,
      isVerified:true
    });

    if(user){
     const deletedOtp = await Otp.findOneAndDelete({ email:email});
    
    }

    res.status(201).json({
      message:"Email verified and account created successfully"
    });

  }catch(error){

    console.log("VERIFY OTP ERROR:",error);

    res.status(500).json({
      message:"Verification failed"
    });

  }

};



// LOGIN
const login = async (req,res)=>{

  const { email, password } = req.body;

  try{

    const user = await User.findOne({ email });
  
    if(!user || user === null){
      return res.status(400).json({ message:"Looks like you don't have an Account please signup" });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.status(400).json({ message:"Invalid password" });
    }

    if(!user.isVerified){
      return res.status(400).json({
        message:"Please verify your email first"
      });
    }
    
    const otp = Math.floor(100000 + Math.random()*900000).toString();

    // hash OTP
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp,salt);

    const savedOtp = await Otp.create({
      email:email,
      otpHash:otpHash
    });

    // create temporary token with user data
    const tempToken = jwt.sign(
      {
        email,
        password,
        otpExpiry: Date.now() + 5*60*1000
      },
      process.env.JWT_SECRET,
      {expiresIn:"5m"}
    );

    // send OTP email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email, // recipient
  from: process.env.EMAIL_USER, // verified sender
  subject: "Your OTP Verification Code",
  html: `
    <h2>Email Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP expires in 5 minutes.</p>
  `,
};

await sgMail.send(msg);

    res.status(200).json({
      message:"OTP sent to email",
      requiresVerification:true,
      tempToken
    });

  }catch(error){
    res.status(500).json({ message:error.message });
  }
};

const LoginVerifyOtp = async (req,res)=>{

  const {otp,tempToken} = req.body;


  try{

    // decode temporary token
    const decoded = jwt.verify(tempToken,process.env.JWT_SECRET);
  
    // check expiry
    if(Date.now() > decoded.otpExpiry){
      return res.status(400).json({message:"OTP expired"});
    }

    // compare OTP
    const email = decoded.email
    const storedOtp = await Otp.findOne({email});

    const isValid = await bcrypt.compare(otp,storedOtp.otpHash);


    if(!isValid){
      return res.status(400).json({message:"Invalid OTP"});
    }
     
    const user = await User.findOne({email});

    if(user){
      const deletedOtp = await Otp.findOneAndDelete({ email:email});
    }
    
    const token = generateToken(user._id);

    res.json({
      message:"Login successfully",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    });

    res.status(201).json({
      message:"Email verified and loggedin successfully"
    });

  }catch(error){

    console.log("VERIFY OTP ERROR:",error);

    res.status(500).json({
      message:"Verification failed"
    });

  }

};

// RESEND VERIFICATION

const resendOtp = async (req, res) => {
  const { tempToken } = req.body;

  if (!tempToken) {
    return res.status(400).json({
      message: "Temp token required"
    });
  }

  try {
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // delete old OTP
    await Otp.findOneAndDelete({ email });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    await Otp.create({ email, otpHash });

    // refresh token
    const newTempToken = jwt.sign(
      {
        email,
        otpExpiry: Date.now() + 5 * 60 * 1000
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Resend OTP",
      html: `<h1>${otp}</h1><p>Expires in 5 minutes</p>`
    });

    return res.status(200).json({
      message: "OTP resent successfully",
      tempToken: newTempToken
    });

  } catch (error) {
    console.log("RESEND OTP ERROR:", error);

    return res.status(400).json({
      message: "Invalid or expired session, login again"
    });
  }
};



module.exports = {
  register,
  login,
  LoginVerifyOtp,
  resendOtp ,
  verifyOtp
};