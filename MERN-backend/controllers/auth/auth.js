//dependencies 
const bcrypt = require('bcrypt');
const express = require('express');
const authRouter = express.Router();

//models
const User = require('../../models/user.js')

//routes
//======== Account Sign Up =============== 

//READ Sign Up Page
//I dont think we need to read this and the component should be loaded on the front end

//create an account
authRouter.post('/signup', async (req, res) => {
    try {
        //check username availbility
        const userInDatabase = await User.findOne({ username: req.params.username });
        if(userInDatabase){
            return res.json({ message:'Username is already taken'});
        }
        //compares and validates if passwords math on sign up
        if (req.body.password !== req.body.confirmPass){
            return res.json({message: 'Passwords do not match.'})
        }
        //if user name is not take and passwords match create account
        
        //creates account
        const user = await User.create({
            username: req.body.username,
            //hash and salt password on creation
            password: bcrypt.hashSync(req.body.password, 10)
        });

        res.status(201).json(user)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//======== Account Login =============== 

//Get render will be handled by front end componenet

//Login - post 

authRouter.post('/login', async (req, res) => {
    try {
        //checks to see if username is in database
        const userInDatabase = await User.findOne({username: req.body.username})
        //if user does not exsist
        if(!userInDatabase){
           res.json({message: 'No user found'}); // have as temp for testing, change to Username or Password does not match
        };

        //compare passwords
        const validatePW = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        //if submitted password does not match account password
        if (!validatePW){
            res.json({message: 'Incorrect Password'}); // have as temp for testing, change to Username or Password does not match
        };

        //create session for user in cookies
        // req.session.user = {
        //     _id: userInDatabase._id,
        //     username: userInDatabase.username
        // }
        
        //redirect?
        // res.redirect('/')

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//======== Account Logout ===============

// authRouter.get('/sign-out', (req, res) => {
//     req.session.destroy(() => {
//         // res.redirect('/') // should be handled by front end handler
//     })
// })

// to add?
//account settings
//account deletion


module.exports = authRouter


//===========grave yard

   //stores locally the user Id and name in cookies
        // req.session.user ={
        //     _id: user._id,
        //     username: user.username
        // };

        // req.session.save(() => {
        //     res.redirect('/') //not sure this will work on the frontend
        // })

                //hash and salt password on creation
        // const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // req.body.password = hashedPassword
