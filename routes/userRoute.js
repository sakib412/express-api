const express = require('express');
const authController = require('../controller/authController')

const router = express.Router()

router.get("", authController.getAllUser);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.patch("/update", authController.update);


module.exports = router;