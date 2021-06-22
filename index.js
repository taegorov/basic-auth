'use strict';

require('dotenv').config();
const server = require('./src/server.js');
// const data = require('./src/auth/models/index.js');

const PORT = process.env.PORT || 3001;

// data.db.sync().then(() => {
//   server.start(PORT);
// });

server.start(PORT, () => console.log('server up and running at port: '));