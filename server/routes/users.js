const router = require("express").Router();

const {getUserById, updateUserById} = require("../controllers/userControllers");

router.get("/:id", getUserById);
router.patch("/:id", updateUserById);

module.exports = router;
