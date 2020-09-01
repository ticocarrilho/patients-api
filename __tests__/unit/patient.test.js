const dbHandler = require('../db-handler');
const Patient = require('../../src/app/models/Patient');
const patientInfo = require('../faker');


beforeAll(async () => {
  await dbHandler.connect();
});
afterEach(async () => {
  await dbHandler.clearDatabase();
});
afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('patient', () => {
  it('should create successfully', async () => {
    expect(async () => await Patient.create(patientInfo)).not.toThrow();
  });

  it('should have a valid _id', async () => {
    const savedPatient = await Patient.create(patientInfo);
    expect(savedPatient._id).toBeDefined();
  });

  it('should not save a patient without a name', async () => {
    const { name, ...patientWithoutName } = patientInfo;
    await expect(
      async () => await Patient.create(patientWithoutName)
    ).rejects.toThrow();
  });

  it('should not save a patient without an age', async () => {
    const { age, ...patientWithoutAge } = patientInfo;
    await expect(
      async () => await Patient.create(patientWithoutAge)
    ).rejects.toThrow();
  });

  it('should not save a patient without a phone', async () => {
    const { phone, ...patientWithoutPhone } = patientInfo;
    await expect(
      async () => await Patient.create(patientWithoutPhone)
    ).rejects.toThrow();
  });

  it('should not save a patient without an email', async () => {
    const { email, ...patientWithoutEmail } = patientInfo;
    await expect(
      async () => await Patient.create(patientWithoutEmail)
    ).rejects.toThrow();
  });
  it('should not save a patient without an address', async () => {
    const { address, ...patientWithoutAddress } = patientInfo;
    await expect(
      async () => await Patient.create(patientWithoutAddress)
    ).rejects.toThrow();
  });
  it('should not save a patient with an empty required field', async () => {
    await expect(
      async () => await Patient.create({...patientInfo, name: ''})
    ).rejects.toThrow();
  });
});
