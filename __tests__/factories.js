const { factory } = require('factory-girl');
const Patient = require('../src/app/models/Patient')
const patientInfo = require('./faker');

factory.define('Patient', Patient, patientInfo);

module.exports = factory