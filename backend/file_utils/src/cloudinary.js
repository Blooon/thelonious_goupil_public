var cloudinary = require("cloudinary").v2;
const uuidv1 = require("uuid/v1");
const fs = require("fs");
class Cloudinary {
  constructor(params) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    this.directory = process.env.CLOUDINARY_DIRECTORY + "/";
  }
  async uploadFile(fileData, dossier) {
    const tmpFile = uuidv1();
    await new Promise((resolve, reject) =>
      fs.writeFile(tmpFile, fileData, err => {
        if (err) return reject(err);
        resolve()
      })
    );
    const Key = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        tmpFile,
        {
          public_id: this.directory + dossier + uuidv1(),
          responsive_breakpoints: {
            create_derived: true,
            bytes_step: 20000,
            transformation: {
              crop: "fill",
              gravity: "auto"
            }
          }
        },
        function(error, result) {
          if (error) return reject(error);
          resolve(result.public_id);
        }
      );
    });
    fs.unlink(tmpFile)
    console.log(Key);
    return Key;
  }

  async uploadBase64File(fileBase64, dossier) {
    const base64result = fileBase64.split(",")[1];
    const fileData = Buffer.from(base64result, "base64");
    return this.uploadFile(fileData, dossier);
  }
}
module.exports = Cloudinary;
// https://res.cloudinary.com/djmvvlxoj/image/upload/w_10/thelonious/0c5bad70-e37e-11e9-801b-5d7e6c794ec4.png
