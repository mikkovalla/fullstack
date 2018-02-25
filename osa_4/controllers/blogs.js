const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({
        error: 'title and/or URL missing!'
      })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title === undefined ? null : body.title,
      author: body.author,
      url: body.url === undefined ? null : body.url,
      likes: body.likes,
      user: user._id
    })

    if (isNaN(blog.likes)) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) //käyttäjän liittäminen blogiin
    await user.save()
    response.json(Blog.format(savedBlog))
  } catch (error) {
    console.log(error)
    response.status(500).json({
      error: 'something went wrong...'
    })
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
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch (error) {
    console.log(error)
    response.status(400).send({
      error: 'malformatted id'
    })
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