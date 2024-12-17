
//User Model
const { transform } = require("lodash");
const mongoose = require("mongoose");
const { string } = require("yargs");


const contentSchema = new mongoose.Schema({
  title: String, //title of the content
  name: String,  //Name of the Cryptid if applicable
  video: String, //essence of the content, video link,
  image: String, //image
  blog: String, // string of text
  dateUploaded: String, //good chance that MONGODB tracks this metadata on their own.  Added here either way.
  });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      content: [contentSchema], // embedding contentSchema here so that items are tied to the user that uploaded them
    });

    const User = mongoose.model('User', userSchema);  
//const Content = mongoose.model('Content', contentSchema)

userSchema.set( 'toJSON', {
  transform:(document, returnedObject) => {
    delete returnedObject.password;
  }
});

                                                      
module.exports = User;
//module.exports = Content;

//swap the commented out lines with the lines above them to convert to a stand alone content model.


 