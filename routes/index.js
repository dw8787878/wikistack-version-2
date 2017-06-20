'use strict';

const express = require('express');
const router = module.exports = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');


router.use('/wiki', wikiRouter);
// router.use('/user', userRouter);

