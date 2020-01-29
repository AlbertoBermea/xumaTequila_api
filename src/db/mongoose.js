const mongoose = require('mongoose')


if ( process.env.NODE_ENV === 'production') {
  connectionURL = process.env.DB_CONNECTION_STRING
} else {
  const config = require('../config.js')
  connectionURL = config.connectionURL
}

//console.log(connectionURL)
// revisa tu connectionURL aqui :-)

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
