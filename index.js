const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { ObjectId } = require('bson');

const app = express()
app.use(cors())
app.use(bodyParser.json())


const { MongoClient } = require('mongodb');
const uri = `${process.env.MONGODB_URI}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
  console.log("connected")
});


app.get('/', (req, res) => {
    res.send('Welcome to aircraft service system Database!')
  })
  
  const port = process.env.PORT || 5000;
  app.listen(port)