const user = require("../models/user");
const jwt = require("jsonwebtoken");

class userServices {
  // create a user

  async createUser(filter) {
    return await user.create(filter);
  }

  // user login

  async getUserByEmail(email) {
    return await user.findOne({ email });
  }
  async login(data) {
    try {

      const { email, password } = data;
      const theUser = await this.getUserByEmail(email);
      //   console.log(theUser);

      if (!theUser) {
        throw new Error(" user does not exist");
      }
      const isCorrectpassword = await theUser.comparePassword(password);
      console.log("is correct password", isCorrectpassword);
      if (!isCorrectpassword) {
        throw new Error("invalid password");
      }

      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRETE_KEY,
        {
          expiresIn: "2hr",
        }
      );
      return token;
    } catch (error) {
      //console.log("err here ", error);
      throw new Error(error);
    }
  }

  // edit a user
  async updateUser(id, userData) {
    return await user.findByIdAndUpdate(
      id,
      {
        $set: { ...userData },
      },
      { new: true } // returns the new updated data
    );
  }

  // get a user
  async getUser(filter) {
    const result = await user.findOne(filter);
    return result;
  }
  // get user by param
  // async getUserByParam(param){
  //  return user.find(param)
  // }

  // get all users
  async getAllUsers(filter) {
    const result = await user.find(filter);
    return result;
  }

  // delete a user
  async deleteUser(filter) {
    const result = await user.findByIdAndDelete(filter);
    return result;
  }
  // follow a user

  async follow(filter) {
   const paramuser = await user.findById(filter);
   const reqUser = await await user.findById(filter)
return paramuser,reqUser;
  }
}

module.exports = new userServices();
