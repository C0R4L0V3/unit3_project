
//User Model
const { transform } = require("lodash");
const mongoose = require("mongoose");


const contentSchema = new mongoose.Schema({
  name: String,
  value: String, //essence of the content, image/video link, string of text for a comment etc.
  category: String, //e.g. "Comment", "Image", "Video", for now if the user has a lot of uploads I imagine we will parse they by content-type.
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


 