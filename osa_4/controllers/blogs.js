const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({
        error: 'title and/or URL missing!'
      })
    }

    const user = await User.findById(decodedToken.id)
    console.log('user', user._id)

    const blog = new Blog({
      title: body.title === undefined ? null : body.title,
      author: body.author,
      url: body.url === undefined ? null : body.url,
      likes: body.likes,
      user: user.id
    })

    if (isNaN(blog.likes)) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) //käyttäjän liittäminen blogiin
    await user.save()

    response.json(Blog.format(savedBlog))
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      response.status(401).json({
        error: error.message
      })
    } else {
      console.log(error)
      response.status(500).json({
        error: 'something went wrong...'
      })
    }
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (error) {
    console.log(error)
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    console.log(blog.user, decodedToken.id)

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return response.status(400).json({
        error: 'only creator can delete a blog'
      })
    }

    if (blog) {
      await blog.remove()
    }

    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({
        error: exception.message
      })
    } else {
      console.log(exception)
      response.status(500).json({
        error: 'something went wrong...'
      })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      ...body,
      likes: body.likes
    }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      likes: body.likes
    })
    response.json(Blog.format(updateBlog))

  } catch (error) {
    console.log(error)
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

module.exports = blogsRouter