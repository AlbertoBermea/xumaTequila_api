const mongoose = require('mongoose')


if ( process.env.NODE_ENV === 'production') {
  mapbax_token = process.env.connectionURL
} else {
  const config = require('../config.js')
  connectionURL = config.connectionURL
}

console.log(connectionURL)
// revisa tu connectionURL aqui :-)

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
