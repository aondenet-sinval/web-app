var express = require('express');
var router = express.Router();

/* GET home page. original */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
/* GET home page. */
router.get('/', async (req, res) => {
  const db = require("../db");
  const Users = db.Mongoose.model('users', db.UserSchema, 'users');

  const docs = await Users.find({}).lean().exec();
  res.render('index', { docs });
});

/* GET New User page. */
router.get('/user', (req, res) => {
  res.render('user', { title: 'Cadastro de Usuário' });
});

/* GET View Store page. */
router.get('/store', (req, res) => {
  res.render('store', { title: 'Cadastro de Usuário' });
});

/* POST new user */
router.post('/user', async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;

  const db = require("../db");
  const Users = db.Mongoose.model('users', db.UserSchema, 'users');
  const user = new Users({ username, email });

  try {
    await user.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});


/* POST new client */
router.post('/client/', async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;

  const dbc = require("../dbClientes");
  const Client = dbc.Mongoose.model('customers', dbc.CustomerSchema, 'customers');
  const client = new Client({ name, email });

  try {
    await client.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

/* GET New User client. */
router.get('/client', (req, res) => {
  res.render('client', { title: 'Cadastro de Clientes' });
});

/* POST new client */
router.post('/client/', async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;

  const dbc = require("../dbClientes");
  const Client = dbc.Mongoose.model('customers', dbc.CustomerSchema, 'customers');
  const client = new Client({ name, email });

  try {
    await client.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

/* GET all customers. */
router.get('/customers', function (req, res, next) {
	var dbClientes = require('../dbClientes');
	var Customer = dbClientes.Mongoose.model('customers', dbClientes.CustomerSchema, 'customers');
	Customer.find({}).lean().exec(function(e,docs){
	   res.json(docs);
	   res.end();
	});
	
});
/* GET ONE customers. */

router.get('/customers/:id', function (req, res, next){
     var dbCli = require('../dbClientes');
     var Customer = dbCli.Mongoose.model('customers', dbCli.CustomerSchema, 'customers');
     Customer.find({ _id: req.params.id }).lean().exec(function (e, docs){
          res.json(docs);
          res.end();
     });
 });

module.exports = router;
