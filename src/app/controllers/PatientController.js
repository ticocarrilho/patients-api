const Patient = require('../models/Patient');

module.exports = {
  async store(req, res) {
    try {
      const data = await Patient.create(req.body);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({error: error.message})
    }
    
  },
  async index(req, res) {
    const data = await Patient.find({});
    return res.json(data);
  },
};
