const dotenv = require('dotenv');
dotenv.config(); //attempted to make both back and front end load//npm install @vitejs/plugin-react
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
app.use(cors())

app.use(express.json())

//routers
// app.use()




app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})