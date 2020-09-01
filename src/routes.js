const express = require('express');
const { body } = require('express-validator');
const PatientController = require('./app/controllers/PatientController');
const routes = express.Router();

routes.get('/api/patients', PatientController.index);
routes.get('/api/patients/:patientId', PatientController.show);
routes.post(
  '/api/patients',
  [
    body('email').isEmail().normalizeEmail(),
    body('address.zipcode').isPostalCode('BR'),
  ],
  PatientController.store
);
routes.patch(
  '/api/patients/:patientId',
  [
    body('email').optional().isEmail().normalizeEmail(),
    body('address.zipcode').optional().isPostalCode('BR'),
  ],
  PatientController.update
);
routes.delete('/api/patients/:patientId', PatientController.delete);

module.exports = routes;
