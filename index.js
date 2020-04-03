const express = require('express');
const cors = require('cors');
const  bodyParser = require('body-parser');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

const  users = ["Asad", "Moin", "Sabed", "Susmita", "Sohana", 'Sabana'];



app.get('/products', (req, res) =>{


    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
      collection.find().limit(10).toArray((err, documents)=> {
          if (err){
              console.log(err)
              res.status(500).send({message:err})
          }
          else{
                res.send(documents);
          }
          
      });
        client.close();
      });

   
});

// app.get('/fruits/banana', (req, res )=>{
//     res.send({fruit:'banana', quantity:100, price: 10000});
// })




app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    // console.log(req.query.sort);
    const name = users[id];
    res.send({id, name});
})

// post 
app.post('/addProduct', (req, res) =>{
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
      collection.insertOne(product, (err, result)=> {
          if (err){
              console.log(err)
              res.status(500).send({message:err})
          }
          else{
                res.send(result.ops[0]);
          }
          
      });
        client.close();
      });


})
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('listesnting to port 4000'));