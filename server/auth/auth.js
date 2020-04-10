const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../config/config')
const checkToken = expressJwt({ secret: config.secrets.jwt })
const User = require('../api/user/userModel')

exports.decodeToken = () => (req, res, next) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token
    }
    checkToken(req, res, next)
}

exports.getFreshUser = () => (req, res, next) => {
    User.findById(req.user._id)
        .select('-password')
        .populate('ingredients')
        .then(user => {
            if (!user) {
                res.status(401).send('Unathourized')
            } else {
                req.user = user
                next()
            }
        })
        .catch(error => next(error))
}

exports.verifyUser = () => (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password)
        return res.status(400).send('You need a username and password')

    User.findOne({ username })
        .then(user => {
            if (!user) {
                console.log('wrong user')
                res.status(401).send('No matching username or password')
            } else {
                if (!user.authenticate(password)) {
                    console.log('wrong pass')
                    res.status(401).send('No matching username or password')
                } else {
                    req.user = user
                    next()
                }
            }
        })
        .catch(error => next(error))
}

exports.signToken = id =>
    jwt.sign({ _id: id }, config.secrets.jwt, { expiresIn: config.expireTime })
