const router = require("express").Router();
const postControllers = require("../controllers/post");

router.post("/", postControllers.postsReq);
router.put("/:id", postControllers.editPost);
router.get("/:id", postControllers.getPost);
router.get("/", postControllers.getAllThePost);
router.delete("/:id", postControllers.deletePosts);
router.put("/:id/likes/dislikes", postControllers.likeOrDislike);
module.exports = router;
