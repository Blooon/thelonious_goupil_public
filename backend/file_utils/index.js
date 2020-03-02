const local = require('./src/local');
const s3 = require('./src/s3');
const cloudinary = require('./src/cloudinary')
function main(type, params) {
    if (type === 'local') {
        return new local(params);
    }
    else if (type === 's3') {
        return new s3(params);
    }
    else if (type === 'cloudinary') {
        return new cloudinary(params)
    }
}

module.exports = main;