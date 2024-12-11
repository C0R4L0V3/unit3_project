const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')
app.use(cors())

// //models

// const tbd = require('./models/tbd.js');


//import controllers


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on ('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`);   
});

//middleware
app.use(cors({ origin: 'http://localhost:5173'}))

app.use(express.json())

//routers
// app.use()




app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})