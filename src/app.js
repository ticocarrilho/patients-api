const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dbConfig = require('./database/config');

class AppController {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(morgan('common'));
  }

  database() {
    mongoose.connect(dbConfig.uri, { useNewUrlParser: true });
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;
