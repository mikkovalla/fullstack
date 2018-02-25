const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    notes: user.notes
  }
}

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const findUser = await User.find({
      username: body.username
    })

    if (findUser.length > 0) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    if (body.password.length < 3) {
      return response.status(400).json({
        error: 'password must be at over 3 characters'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    if (isNaN(user.adult)) {
      user.adult = true
    }

    const savedUser = await user.save()
    response.json(User.format(savedUser))
  } catch (error) {
    console.log('error', error)
    response.status(500).json({
      error: 'Something went wrong...'
    })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(User.format))
})
module.exports = usersRouter