const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router
    .route("/me")
    .get(authController.authenticate, userController.getMe)
    .put(authController.authenticate, userController.updateMe);

module.exports = router;
