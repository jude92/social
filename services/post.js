const Posts = require("../models/posts");

class postServices {
  async postRequest(filter) {
    return await Posts.create(filter);
  }
  // edit posts
  async updatePost(filter) {
    try {
      return await Posts.findById(filter);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  //get a post
  async getpost(id) {
    return await Posts.findById(id);
  }

  // get all Posts
  async getallPosts(filter) {
    return await Posts.find({});
  }
  // delete a posts
  async delPosts(id) {
    return await Posts.deleteOne(id);
  }

  // like a post
  async likedislike(id){
    return await Posts.findById(id)

  }
}
module.exports = new postServices();
