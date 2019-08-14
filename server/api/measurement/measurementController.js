const Measurement = require('./measurementModel')

exports.params = (req, res, next, id) => {
    Measurement.find({ id })
        .exec()
        .then(measurement => {
            if (!measurement) {
                next(new Error('No post with id ' + id))
            } else {
                req.measurement = measurement
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
    Measurement.find(search)
        .exec()
        .then(measurements => res.json(measurements))
        .catch(error => next(error))
}

exports.getOne = (req, res) => {
    res.json(req.measurement)
}

exports.post = (req, res, next) => {
    const measurement = req.body
    Measurement.create(measurement)
        .then(measurement => res.json(measurement))
        .catch(error => next(error))
}
