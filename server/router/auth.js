const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require("../db/conn");
const User = require("../model/userSchema");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "please fill the empty fields..." });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else {
      const user = User({ name, email, password });

      await user.save();
      res.status(201).json({ message: "user registered successfully..." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "please provide user name and password" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "invalid credentials in password" });
      } else {
        res.json({ message: "user loggedIn successfully..." });
      }
    } else {
      return res
        .status(400)
        .json({ error: "invalid credentials in email or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Route for sending the reset link
router.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token and set its expiration time
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "210701052@rajalakshmi.edu.in",
        pass: "avdhjruj",
      },
    });

    const mailOptions = {
      to: email,
      from: "210701052@rajalakshmi.edu.in",
      subject: "Password Reset",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/reset-password/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: "Email could not be sent." });
      }
      res.json({ message: "Email sent with password reset instructions." });
    });
  } catch (error) {
    // Handle errors
  }
});

router.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    // Reset the user's password and clear the reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.log(error);
  }
});

router.get("/reset-password/:token", async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (user) {
    // Assuming you want to redirect to "/reset-password/:token" with the token
    res.redirect(`http://localhost:3000/reset-passwords/${token}`);
  } else {
    return res.status(400).json({ message: "token is not valid." });
  }
});

module.exports = router;
