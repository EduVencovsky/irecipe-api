const Appliance = require('./applianceModel')

exports.params = (req, res, next, id) => {
    Appliance.find({ id })
        .exec()
        .then(appliance => {
            if (!appliance) {
                next(new Error('No post with id ' + id))
            } else {
                req.appliance = appliance
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    let search = {}
    let { field, value } = req.regexQuery || {}
    if (field && value) {
        search[field] = value
    }
    Appliance.find(search)
        .exec()
        .then(appliances => res.json(appliances))
        .catch(error => next(error))
}

exports.getOne = (req, res) => {
    res.json(req.appliance)
}

exports.post = (req, res, next) => {
    const appliance = req.body
    Appliance.create(appliance)
        .then(appliance => res.json(appliance))
        .catch(error => next(error))
}
