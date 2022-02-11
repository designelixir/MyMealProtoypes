"use strict";
const init = ({ to, subject, text }) => {
  return new Promise((resolve, reject) => {
    try {
      // if (process.env.NODE_ENV !== "production") {
      //   require("dotenv").config({ path: __dirname + "/./../.env" });
      // }
      const transporter = require("nodemailer").createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_CLIENT,
          pass: process.env.PASS_CLIENT,
        },
      });
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.EMAIL_CLIENT,
      //     pass: process.env.PASS_CLIENT,
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // });
      let mailOptions = {
        from: process.env.EMAIL_CLIENT,
        to,
        subject,
        text,
      };
      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("sent");
          resolve("sent");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  });
};

module.exports = init;
