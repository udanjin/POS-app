const express = require('express');
const router = express.Router();
const { postLogin, register,logout} = require('../controllers/login');

router.post('/register', register)
router.post('/login', postLogin);
router.post("/logout",logout)
module.exports = router;