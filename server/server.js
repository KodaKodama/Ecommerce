const express = require('express');
const db = require('./db/db');
require('dotenv').config();
const app = express();
db();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('server is running');
});

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/upload'))
// app.use('/api', require('./routes/productRouter'))