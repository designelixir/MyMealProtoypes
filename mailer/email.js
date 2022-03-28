"use strict";
const init = ({ to, subject, text }) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = require("nodemailer").createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_CLIENT,
          pass: process.env.PASS_CLIENT,
        },
      });
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
