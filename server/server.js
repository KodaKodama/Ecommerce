const express = require('express');
const db = require('./db/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();
db();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))

app.listen(PORT, () => {
    console.log('server is running');
});

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'))