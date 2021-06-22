'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);


// === === 404 on a bad route === === //
test('404 on a bad route', async () => {
  const response = await mockRequest.get('/badroute');
  expect(response.status).toEqual(404);
});


// === === 404 on a bad method === === //
test('404 on a bad method', async () => {
  const response = await mockRequest.post('/person');
  expect(response.status).toEqual(404);
});
