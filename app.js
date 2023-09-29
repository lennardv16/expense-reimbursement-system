const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/tickets', ticketRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running, you better catch it!`);
});
