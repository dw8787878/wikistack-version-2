'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  // res.send('got to POST /wiki/')
  //res.json(req.body);
  let page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()

});

router.get('/add', function(req, res, next) {
  res.render('../views/addpage');
});


module.exports = router;
