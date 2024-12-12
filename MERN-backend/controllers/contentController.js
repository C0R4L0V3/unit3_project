const User = require("../models/user");
//adding content
const addUserContent = async (req, res) => {
  const { userId } = req.params;
  const { name, value, category } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });
    const newContent = { name, value, category, dateUploaded: new Date() };
    user.content.push(newContent);
    res.json({ message: "content created", newContent });
  } catch (error) {
    console.log("Error adding content");
  }
};

//get the content
const getUserContent = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });
    res.json(user.content);
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
  } catch (error) {
    console.log("error updating content");
  }
};

const deleteUserContent = async (req, res) => {
  const { userId, contentId } = req.params;

  try {
    const user = await user.findById(userId);
    if (!user) return res.json({ message: "user not found" });
    const content = user.content.id(contentId); //find the subdocument by its id
    content.remove(); //remove the content
  } catch (error) {
    console.log("error deleting content");
  }
};

module.exports = {
  getUserContent,
  addUserContent,
  updateUserContent,
  deleteUserContent,
};
