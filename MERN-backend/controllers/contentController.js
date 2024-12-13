const { json } = require("express");
const User = require("../models/user");
const { all } = require("../routes/userRoutes");
//adding content
const addUserContent = async (req, res) => {
  const { userId } = req.params;
  const { name, value, category } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });
    const newContent = { name, value, category, dateUploaded: new Date() };
    user.content.push(newContent);
    await user.save(); //Needed to save the User object in the model to reflect changes to the embedded array
    res.json({ message: "content created", newContent });
  } catch (error) {
    console.log("Error adding content");
  }
};

//get all content
const getAllContent = async (req,res) => {
let displayContent = [] //this had to be a let because otherwise it was not able to be returned as a json
//MATT PLEASE EXPLAIN
try{
const allUsers = await User.find();
// res.json({users: allUsers}) //this works
anArray = allUsers.map((user) => {
  user.content.map((content) => {
    
    displayContent.push(content)
  })
})

res.json({displayContent})
} catch (error) {
  console.log("Error retrieving content");
}
};

//get the content
const getUserContent = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });
    res.json(user.content);
    console.log(user.content);
  } catch (error) {
    console.log("Error getting user content");
  }
};
//update user content
const updateUserContent = async (req, res) => {
  const { userId, contentId } = req.params;
  const { name, value, category } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "user not found" });
    const content = user.content.id(contentId); //find the subdocument by its id
    if (!content) return res.json({ message: "content not found" });
    if (name) content.name = name;
    if (value) content.value = value;
    if (category) content.category = category;
    await user.save(); //We don't have here to return new true because we are awaiting the save.
    res.json(user.content);
  } catch (error) {
    console.log("error updating content");
  }
};


const deleteUserContent = async (req, res) => {
  const { userId, contentId } = req.params;

  // console.log(contentId);
  // console.log(userId);
  
  try {
    const person = await User.findById(userId);
    if (!person) return res.json({ message: "user not found" });
    // await user.content.findByIdAndDelete(contentId);
    // const content = person.content.id(contentId); //find the subdocument by its id
    // content.remove();
    await person.content.id(contentId).deleteOne(); //remove the content
    await person.save();
    return res.json(`${contentId} deleted`)//We can beautify this later if we want.  Right now it returns long ID
  } catch (error) {
    console.log("error deleting content");
  }
};

module.exports = {
  getUserContent,
  addUserContent,
  updateUserContent,
  deleteUserContent,
  getAllContent,
};
