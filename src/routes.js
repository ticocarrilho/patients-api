const express = require('express');
const PatientController = require('./app/controllers/PatientController');
const routes = express.Router();

routes.get('/api/patients', PatientController.index);
routes.get('/api/patients/:patientId', PatientController.show);
routes.post('/api/patients', PatientController.store);
routes.patch('/api/patients/:patientId', PatientController.update);
routes.delete('/api/patients/:patientId', PatientController.delete);

module.exports = routes;
