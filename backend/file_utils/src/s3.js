const AWS = require('aws-sdk');

class FilesS3 {
    constructor(params) {
        this.s3 = new AWS.S3({
            accessKeyId: params.AWS_KEY_ID,
            secretAccessKey: params.AWS_KEY_SECRET
          });
        this.bucket = params.S3_BUCKET;
    }
  async uploadFile(data, Key) {
    const params = {
      Bucket: this.bucket,
      Key: Key,
      Body: data
    }

    const location = await this.s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err
      console.log(`File uploaded successfully at ${data.Location}`);
      return data.location;
    });
    return location
  }

  async uploadBase64File(fileBase64, dossier, name) {
    const base64result = fileBase64.split(',')[1];
    const fileData =  Buffer.from(base64result, 'base64');
    return await this.uploadFile(fileData, dossier + name);
  }

}

module.exports = FilesS3;