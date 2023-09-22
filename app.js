const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());


// Add request routing
app.use(userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});
