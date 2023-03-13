const router = require("express").Router();


const userController = require("../controllers/users");

router.post("/", userController.createUser);
router.post("/login", userController.userlogin);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllusers);

module.exports = router;
