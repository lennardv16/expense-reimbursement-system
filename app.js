const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {});

app.put('/', (req, res) => {});

app.delete('/', (req, res) => {});

// Server Running
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}! Better catch it!`);
});
