const dotenv = require('dotenv');
dotenv.config(); //attempted to make both back and front end load//npm install @vitejs/plugin-react
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const cors = require('cors')
app.use(cors())

//custom middleware
const isSignedIn = require('./middleware/isSignedIn.js');
const passUserToView = require('./middleware/passUserToView.js')
const authRouter = require('./controllers/auth/auth.js')
//import controllers    

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}.`);
});

//models
const User = require('./models/user.js')

// const tbd = require('./models/tbd.js');



app.use(express.json());
app.use("/users", userRoutes); //Mount routes

//routers
// app.use()

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
