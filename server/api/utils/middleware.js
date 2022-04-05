/* eslint-disable no-unused-vars */
const {
  Op,
  models: { User },
} = require("../../db");
const pkg = require("../../../package.json");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies[`token-${pkg.name}`]);
    next();
  } catch (e) {
    next(e);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    req.user = await User.isAdmin(req.cookies[`token-${pkg.name}`]);
    next();
  } catch (e) {
    next(e);
  }
};

const upload = multer({
  storage: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      Bucket: "my-meal-images",
    }),
    bucket: "my-meal-images",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).array("file", 10);

// const s3Client = () =>
//   new aws.S3({
//     endpoint: new aws.Endpoint("nyc3.digitaloceanspaces.com"),
//   });

module.exports = {
  requireToken,
  isAdmin,
  upload,
};
