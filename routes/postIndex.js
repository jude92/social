const router = require("express").Router();
const postRouter = require("./post")


router.use("/posts",postRouter);

module.exports = router