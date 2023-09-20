const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Routes for employees and managers
app.use('/employees', require('./routes/employees'));
app.use('/managers', require('./routes/managers'));

app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});
