const router =  require("express").Router();
const userRouter = require("./users");

//console.log('I am in the index route')

router.use("/users",userRouter);

module.exports = router;