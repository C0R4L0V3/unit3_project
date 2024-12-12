const dotenv = require('dotenv');
dotenv.config(); //attempted to make both back and front end load//npm install @vitejs/plugin-react
const express = require('express');
const app = express();
const mongoose = require('mongoose');


const cors = require('cors')
app.use(cors())

//custom middleware
const authRouter = require('./controllers/auth/auth.js')
const userRoutes = require('./routes/userRoutes.js')
//import controllers    

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}.`);
});

//models
const User = require('./models/user.js')

// const tbd = require('./models/tbd.js');


app.use(express.json());
//routes
app.use('/auth', authRouter)
app.use("/users", userRoutes); //Mount routes



app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
