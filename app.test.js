const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes.test');
const authRoutes = require('./authRoutes.test');
const userDao = require('./userDao.test');
const uuid = require('uuid');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running, you better catch it!`);
});
