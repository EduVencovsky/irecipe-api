const Post = require('./postModel')
const _ = require('lodash')

exports.params = (req, res, next, id) => {
    Post.findById(id)
        .populate('author categories')
        .exec()
        .then(post => {
            if(!post){
                next(new Error('No post with id ' + id))
            } else {
                req.post = post
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    Post.find({})
        .populate('author categories')
        .exec()
        .then(categories => res.json(categories))
        .catch(error => next(error))
}

exports.getOne = (req, res) => {
    res.json(req.post)
}

exports.put = (req, res, next) => {
    let post = req.post
    let update = req.body
    _.merge(post, update)
    post.save((error, savedPost) => error ? next(error) : res.json(savedPost))
}

exports.post = (req, res, next) => {
    let newPost = req.body
    Post.create(newPost)
        .then(post => res.json(post))
        .catch(error => next(error))
}

exports.delete = (req, res, next) => {
    req.post.remove((error, removed) => {
        if(error){
            next(error)
        } else {
            res.json(removed)
        }
    })
}
