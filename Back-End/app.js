require('dotenv').config;
const express = require('express');
const cors = require('cors');

const app = express(); 

app.use(cors()); // fix CORS Error (Cross Origin Resource Sharing)

// connect with mongo DB
require('./DB/DB_Config');

// middlewares
app.use(express.json());
app.use(express.static('Public'))

const routes = require('./Routes/router');
app.use("/", routes);

// creating a server
const PORT = process.env.PORT || 7575;
app.listen(PORT, ()=> {
    console.log(`server listening on http://localhost:${PORT}`);
});