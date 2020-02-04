const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


if ( process.env.NODE_ENV === 'production') {
  connectionURL = process.env.DB_CONNECTION_STRING
  secretAccessKey = process.env.secretAccessKey
  accessKeyId = process.env.accessKeyID
  bucket = process.env.s3Bucket
  region = process.env.s3Region

} else {
  const config = require('../config.js')
  secretAccessKey = config.secretAccessKey
  accessKeyId = config.accessKeyID
  bucket = config.s3Bucket
  region = config.s3Region
  
  connectionURL = config.connectionURL
}

aws.config.update({
    secretAccessKey: secretAccessKey ,
    accessKeyId: accessKeyId ,
    region: region
});

const s3 = new aws.S3();
 
//upload a file to AWS S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;