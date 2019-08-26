const router = require('express').Router()
const { verifyUser, decodeToken, getFreshUser } = require('./auth')
const controller = require('./controller')

router.post('/signin', verifyUser(), controller.signin)
router.post('/validate', decodeToken(), getFreshUser(), controller.validate)

module.exports = router
