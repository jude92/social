const { deleteUser } = require("../services/users");
const userServices = require("../services/users");
const bcrypt = require("bcrypt");

class userControllers {
  async createUser(req, res) {
    const reqBody = req.body;

    let existingUser;
    existingUser = await userServices.getUser({
      name: reqBody.name.toLowerCase(),
    });
    if (existingUser) {
      return res.status(403).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await userServices.createUser({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
      message: "user created successfully",
      success: true,
      data: newUser,
    });
  }

  // login aa user
  async userlogin(req, res) {
    try {
      console.log(req.body);
      const theuser = await userServices.login(req.body);
      return res.status(200).json({
        message: "user login successfully",
        success: true,
        data: theuser,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  }

  // edit a user

  async updateUser(req, res) {
    const { body } = req;
    const updateduser = await userServices.updateUser(req.params.id, body);

    return res.status(200).json({
      message: "updated successfully",
      success: true,
      data: updateduser,
    });
  }

  // delete a user
  async deleteUser(req, res) {
    const existingUser = await userServices.getUser({ _id: req.params.id });
    if (!existingUser) {
      res.status(403).json({
        message: "user not found",
        success: false,
      });
    }
    const deletedUser = await userServices.deleteUser({ _id: req.params.id });
    res.status(200).json({
      message: "deleted successfully",
      success: true,
      data: deletedUser,
    });
  }

  // get a user
  async getUser(req, res) {
    // let existingUser;
    try {
      const existingUser = await userServices.getUser({ _id: req.params.id });
      if (!existingUser) {
        res.status(403).json({
          message: "user does not exist",
          success: false,
        });
      }

      res.status(200).json({
        message: "success ingetting the user",
        success: true,
        data: existingUser,
      });
    } catch (error) {
      console.log("my error is here", error);
      res.status(401).json(error);
    }
  }

  // get all users
  async getAllusers(req, res) {
    const allUsers = await userServices.getAllUsers({});
    res.status(200).json({
      message: "sucessful",
      success: true,
      data: allUsers,
    });
  }

  // follow user
  async follow(req, res) {
    if (req.body.userId !== req.params.id) {
      try {
        await userServices;
      } catch (error) {}
    } else {
      res.status(401).json("you can not follow urself");
    }
  }
}
module.exports = new userControllers();
