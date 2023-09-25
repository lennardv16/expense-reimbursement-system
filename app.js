const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/', authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running, you better catch it!`);
});
