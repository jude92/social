const postservices = require("../services/post");

class postControllers {
  async postsReq(req, res) {
    try {
      const newPosts = await postservices.postRequest({
        userId: req.body.userId,
        texts: req.body.texts,
      });
      await newPosts.save();
      res.status(201).json({
        message: "post created successfuly",
        success: true,
        data: newPosts,
      });
    } catch (error) {
      console.log(" the err is", error);

      res.status(403).json(error);
    }
  }

  // edit a user
  async editPost(req, res) {
    try {
      const editpost = await postservices.updatePost({ _id: req.params.id });
      if (req.body.userId === editpost.userId) {
        await editpost.updateOne({ $set: req.body });
        res.status(200).json({
          message: "post updated successfully",
          success: true,
          data: editpost,
        });
        res.status(403).json("you can only update your account");
      }
    } catch (error) {
      console.log("here", error);
      res.status(401).json(error);
    }
  }

  // get a post

  async getPost(req, res) {
    const getApost = await postservices.getpost({ _id: req.params.id });
    try {
      if (req.body.userId === getApost.userId) {
        if (!getApost) {
          res.status(403).json("post not found");
        }
        return res.status(200).json({
          message: "successfully gotten",
          success: true,
          data: getApost,
        });
      } else {
        res.status(403).json("you can only get your posts");
      }
    } catch (error) {
      res.status(401).json(error);
    }
  }

  // get all posts
  async getAllThePost(req, res) {
    try {
      const allposts = await postservices.getallPosts({});
      res.status(200).json({
        message: " sucessfully fetched",
        success: true,
        data: allposts,
      });
    } catch (error) {
      res.status(401).json(error);
    }
  }

  // delete a post

  async deletePosts(req, res) {
    try {
      const deletedpost = await postservices.delPosts({ _id: req.params.id });
      if (!deletedpost) {
        res.status(401).json("post not found");
      }
      res.status(200).json({
        message: "post deleted successfully ",
        success: true,
        data: deletedpost,
      });
    } catch (error) {
      res.status(403).json(error);
    }
  }
  async likeOrDislike(req, res) {
    try {
      const user = await postservices.likedislike({ _id: req.params.id });
      console.log(user);
      if (!user.likes.includes(req.body.userId)) {
        await user.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("post liked successfully");
      } else {
        await user.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("you disliked this post");
      }
    } catch (error) {
      console.log("it here", error);
      res.status(403).json(error);
    }
  }
}

module.exports = new postControllers();
