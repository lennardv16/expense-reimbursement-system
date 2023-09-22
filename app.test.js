const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./userRoutes.test');

app.use(bodyParser.urlencoded({}));
app.use(bodyParser.json());

app.use('/', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running, you better catch it!`);
});
