const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const dbHandler = require('../db-handler');
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

describe('POST /api/patients', () => {
  it('should be able to post a patient', async () => {
    const response = await request(app).post('/api/patients').send(patientInfo);
    expect(response.status).toBe(200);
  });

  it('should return 400 when trying to post a patient without a required field', async () => {
    const { name, ...patientWithoutName } = patientInfo;
    const response = await request(app)
      .post('/api/patients')
      .send(patientWithoutName);
    expect(response.status).toBe(400);
  });

  it('should return 400 when trying to post a patient with an empty required field', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({...patientInfo, name: ''});
    expect(response.status).toBe(400);
  });

  it('should return 400 when trying to post a patient with an invalid email format', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({ ...patientInfo, email: 'invalidformat' });
    expect(response.status).toBe(400);
  });
  it('should return 400 when trying to post a patient with an invalid zipcode format', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({
        ...patientInfo,
        address: { ...patientInfo.address, zipcode: '10' },
      });
    expect(response.status).toBe(400);
  });
});

describe('GET /api/patients', () => {
  it('should be able to get all patients', async () => {
    await factory.createMany('Patient', 10);
    const response = await request(app).get('/api/patients');
    expect(response.body).toHaveLength(10);
  });
});

describe('GET /api/patients/:id', () => {
  it('should be able to get an existing patient by id', async () => {
    const patient = await factory.create('Patient');
    const response = await request(app).get(`/api/patients/${patient._id}`);
    expect(response.body.name).toBe(patient.name);
  });
  it('should return 404 when trying to get a non-existing patient', async () => {
    const patient = await factory.create('Patient');
    const response = await request(app).get(
      `/api/patients/${patient._id + 22222}`
    );
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/patients/:id', () => {
  it('should be able to update an existing patient by id', async () => {
    const patient = await factory.create('Patient');
    const name = 'New Name';
    const response = await request(app)
      .patch(`/api/patients/${patient._id}`)
      .send({
        name,
      });
    expect(response.body.name).toBe(name);
  });
  it('should return 404 when trying to update a non-existing patient', async () => {
    const patient = await factory.create('Patient');
    const response = await request(app)
      .patch(`/api/patients/${patient._id + 22222}`)
      .send({
        name: 'New Name',
      });
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/patients/:id', () => {
  it('should be able to delete an existing patient by id', async () => {
    const patient = await factory.create('Patient');
    const response = await request(app).delete(`/api/patients/${patient._id}`);
    expect(response.status).toBe(204);
  });
  it('should return 404 when trying to update a non-existing patient', async () => {
    const patient = await factory.create('Patient');
    const response = await request(app).delete(`/api/patients/${patient._id+999}`);
    expect(response.status).toBe(404);
  });
});
