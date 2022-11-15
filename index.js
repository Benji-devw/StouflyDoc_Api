const express = require('express');
  app = express(),
  mongoose = require('mongoose'),
  trackRouter = require('./routes/track.router'),
  userRouter = require('./routes/user.router'),
  cors = require('cors');

console.log(app);
//Middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "mon-domaine.fr"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
});

// MongoDB
mongoose.connect('mongodb://localhost:27017/stouflydoc', {useNewUrlParser: true, useUnifiedTopology: true});
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connecté à Mongoose : 8080")
  });


// CORS (système de sécurité) || app.use(cors());
app.use(cors());


// ROUTE
app.use('/tracks', trackRouter);
app.use('/user', userRouter);

app.use('/public', express.static('public'));
// app.use('/public', express.static(__dirname + 'public'));


app.listen(8080, () => {
  console.log('Server Ok');
})