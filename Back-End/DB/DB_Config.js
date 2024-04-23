require('dotenv').config();
const mongoose = require('mongoose'); // mongoose for curd with mongodb it allows to connect with mongodb

const URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/EcoS';

// connection function for connect with mongodb
async function connection() {
    // wait for connect
    await mongoose.connect(URL);
    // after connection get message
    console.log("We are Connected");
}
// calling function to make connection.
connection();