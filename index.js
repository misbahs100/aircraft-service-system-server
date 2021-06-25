const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { ObjectId } = require('bson');
const { MongoClient } = require('mongodb');

const app = express()
app.use(cors())
app.use(bodyParser.json())

const uri = `${process.env.MONGODB_URI}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION1}`);
  const seatsCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION2}`);
  console.log("connected")

   // create an order
   app.post('/addAnOrder', (req, res) => {
    const order = req.body;
    console.log("order: ", order);
    orderCollection.insertOne(order)
      .then(result => {
        console.log(result.insertedCount)
        res.send(result.insertedCount > 0);
      })
  })

   // read all orders
  app.get('/orders', (req, res) => {
    orderCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

   // read all seats
   app.get('/seats', (req, res) => {
    seatsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

});


app.get('/', (req, res) => {
    res.send('Welcome to aircraft service system Database!')
  })
  
  const port = process.env.PORT || 5000;
  app.listen(port)