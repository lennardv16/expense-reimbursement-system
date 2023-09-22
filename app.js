const express = require('express');
const app = express();
const routes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const reqLogger = require('./middleware/logger');

const userDAO = require('./dao/userDAO');

// Middleware
app.use(bodyParser.json());

app.use(reqLogger);

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add request routing
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});
