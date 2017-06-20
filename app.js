'use strict';


const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const makesRouter = require('./routes');

var models = require('./models');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure('views', {noCache: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

//Syncs database to Sequelize.  Notice how we imported the models into this page
// using require('./models')
models.User.sync({force: true})
  .then(function() {
      return models.Page.sync({})
  })
  .then(function () {
      app.listen(1337, function(){
        console.log('listening on port 1337');
      });
})
.catch(console.error);

app.use('/', makesRouter);



