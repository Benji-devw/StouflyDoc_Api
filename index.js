const { ServerApiVersion } = require('mongodb');
require ("dotenv").config({path: "./.env.local"});
const express = require('express');
  app = express(),
  mongoose = require('mongoose'),
  trackRouter = require('./routes/track.router');
  // userRouter = require('./routes/user.router'),
const cors = require('cors');


  
//Middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
});



// MongoDB
// mongoose.connect('http://localhost:8080/stouflydoc', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// });
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  .then (() => console.log("connection to db established..."))
  .catch(() => console.log("connection to db failed..."))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion : '));
db.once('open', function() {
  console.log("Connexion à la base de données établie avec succès !");
});


app.use(cors());


// ROUTE
app.use('/tracks', trackRouter);
// app.use('/user', userRouter);

app.use('/public', express.static('public'));
// app.use('/public', express.static(__dirname + 'public'));

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
})