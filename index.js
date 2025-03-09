const { ServerApiVersion } = require('mongodb');
require ("dotenv").config({path: "./.env.local"});
const express = require('express');
  app = express(),
  mongoose = require('mongoose'),
  trackRouter = require('./routes/track.router');
  // userRouter = require('./routes/user.router'),
const cors = require('cors');
const path = require('path')

//Middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
});

// Ajoute cette ligne pour éviter l'avertissement de strictQuery
mongoose.set('strictQuery', false);

// MongoDB
const connectDB = async () => {
  try {
    // Utilise la bonne chaîne de connexion
    const connectionString = process.env.ENV === 'dev' 
      ? 'mongodb://localhost:27017/stouflydoc' 
      : process.env.DB_URI;
    
    console.log('Tentative de connexion à:', connectionString);
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });
    console.log('✅ Connecté à MongoDB');
  } catch (err) {
    console.error('❌ Erreur MongoDB:', err);
    process.exit(1);
  }
};

connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion : '));
db.once('open', function() {
  console.log("Connexion à la base de données établie avec succès !");
});


app.use(cors());


// ROUTE
app.use('/tracks', trackRouter);
// app.use('/user', userRouter);

// app.use('/public', express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port: ${PORT}`);
});