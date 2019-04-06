const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
  res.render('users/list')
}

module.exports.coordinates = (req, res, next) => {
  User.find()
    .then((users) => res.json(users.map(u => u.location)))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const user = new User();

  res.render('users/form', { user })
}

module.exports.doCreate = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
  })

  user.save()
    .then((user) => res.redirect(`/users`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/form', {
          user,
          ...error
        })
      } else {
        next(error)
      }
    });
}
