const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "public/uploads"),
  fb: {
    appId: '1011080306077010',
    appSecret: 'f89470f0e031b04db45c1d10792b80d8'
  }
};