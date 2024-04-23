require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

require('./DB/DB_Config');

const router = require('./Router/Router');

// middlewares
app.use(cors());
app.use("/", router)

const PORT = process.env.PORT || 7575;
app.listen(PORT, () => {
    console.log(`listening on http//localhost:${PORT}`);
})