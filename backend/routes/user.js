const express =require('express');
const router = express.Router();

const userController = require('../controllers/user')
const middleware = require('../middleware/auth')
const chatController = require('../controllers/chat')

router.post('/signup', userController.postSignup )

router.post('/login' , userController.postLogin)

router.post('/message', middleware.authentication , chatController.postMessage )

module.exports = router;