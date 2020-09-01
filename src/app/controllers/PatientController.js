const Patient = require('../models/Patient');

module.exports = {
  async store(req, res) {
    try {
      const patient = await Patient.create(req.body);
      return res.json(patient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async index(req, res) {
    const patients = await Patient.find({});
    return res.json(patients);
  },
  async show(req, res) {
    const { patientId } = req.params;
    try {
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found.' });
      }
      return res.json(patient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { patientId } = req.params;
    try {
      const updatedPatient = await Patient.findOneAndUpdate(
        { _id: patientId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPatient) {
        return res.status(404).json({ error: 'Patient not found.' });
      }
      return res.json(updatedPatient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { patientId } = req.params;
    try {
      const deletedPatient = await Patient.findByIdAndRemove(patientId);
      if (!deletedPatient) {
        return res.status(404).json({ error: 'Patient not found.' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
