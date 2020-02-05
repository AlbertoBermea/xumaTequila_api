const express = require('express')
require('./db/mongoose')
var cors = require('cors');

const router = require('./routes')
const routerImage = require('./file-upload')

//console.log("simon")

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json()) // parsea a json
app.use(router)
app.use(routerImage)

app.use(function(req,res,next){
  res.header("Accesss-Control-Allow-Origin","*")
  res.header("Accesss-Control-Allow-Header","Origin, X-Requested-With,Content_Type, Accept");
  res.header("Accesss-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE");
  next();
})

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})
