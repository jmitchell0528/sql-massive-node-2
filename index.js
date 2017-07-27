var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var config = require('./config.js');
var mainCtrl = require('./controllers/mainCtrl')
var port = 3000;
var connectionString = 'postgres://jessica:1234@localhost:5432/sandbox';

var app = express();
massive(connectionString).then(function(dbInstance) {
  app.set('db', dbInstance)
})

var corsOptions = {
  origin: 'http://localhost:3000'
};

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));
app.use(session(  {
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.json());


app.get('/api/products', mainCtrl.getAllProducts);
app.get('/api/product/:id', mainCtrl.getSingleProduct);
app.post('/api/product', mainCtrl.createProduct);
app.put('/api/product/:id', mainCtrl.updateProduct);
app.delete('/api/product/:id', mainCtrl.destroyProduct);


app.listen(port, function() {
  console.log("Listening on", port)
})
