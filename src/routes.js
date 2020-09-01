const express = require('express');
const PatientController = require('./app/controllers/PatientController');
const routes = express.Router();

routes.get('/api/patients', PatientController.index);
routes.post('/api/patients',PatientController.store)

module.exports = routes;
