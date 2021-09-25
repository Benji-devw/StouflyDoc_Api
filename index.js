const express = require('express');
const app = express();
const mongoose = require('mongoose');
soundsRouter = require('./routes/soundsRouter'),

//Middleware
app.use(express.json())

// MongoDB
mongoose.connect('mongodb://localhost:27017/stouflydoc', {useNewUrlParser: true, useUnifiedTopology: true});
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connecté à Mongoose")
  });



// ROUTE
app.use('/sounds', soundsRouter)




// app.get('/datas', (req,res) => {
//   res.status(200).json(datas)
// })


// app.get('/:id', (req,res) => {
//   console.log(log);
//   const id = req.params.id;
//   const data = SoundSchema.find(data => data._id === id)
//   res.status(200).json(data)
// })


// app.post('/adddata', (req,res) => {
//   datas.push(req.body)
//   res.status(200).json(datas)
// })



// app.put('/datas/:id', (req,res) => {
//   const id = parseInt(req.params.id)
//   let data = datas.find(data => data.id === id)
//   data.name =req.body.name,
//   data.city =req.body.city,
//   data.type =req.body.type,
//   res.status(200).json(data)
// })



// app.delete('/datas/:id', (req,res) => {
//   const id = parseInt(req.params.id)
//   let data = datas.find(data => data.id === id)
//   datas.splice(datas.indexOf(data),1)
//   res.status(200).json(datas)
// })





app.listen(8080, () => {
  console.log('Server Ok');
})