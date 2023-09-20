const express = require('express');
const app = express();
const routes = require('/routes');
const bodyParser = require('body-parser');
const reqLogger = require('./middleware/logger');
const uuid = require('uuid');

const userDAO = require('./dao/userDAO');

// Middleware
app.use(bodyParser.json());

app.use(reqLogger);

// Add request routing
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});
