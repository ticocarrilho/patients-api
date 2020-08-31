const Patient = require('../models/Patient');

module.exports = {
  async store(req, res) {
    const data = await Patient.create(req.body);
    return res.json(data);
  },
  async index(req, res) {
    const data = await Patient.find({});
    return res.json(data);
  },
};
