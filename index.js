const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tracksRouter = require('./routes/tracksRouter');


//Middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "mon-domaine.fr"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
}),

// MongoDB
mongoose.connect('mongodb://localhost:27017/stouflydoc', {useNewUrlParser: true, useUnifiedTopology: true});
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connecté à Mongoose : 8080")
  });



// ROUTE
app.use('/tracks', tracksRouter)




app.listen(8080, () => {
  console.log('Server Ok');
})