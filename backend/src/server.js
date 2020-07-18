const express = require('express');
const app = express();
const cors = require('cors');

const stocksRoutes = require('./routes/stocks');

app.use(cors());
app.use(express.json());
app.use('/stocks', stocksRoutes);

app.listen(3333, () => {
  console.log('[SERVER] Server is running on port 3333');
});