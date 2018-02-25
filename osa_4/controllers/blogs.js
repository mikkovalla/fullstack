const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({
        error: 'title and/or URL missing!'
      })
    }

    const blog = new Blog({
      title: body.title === undefined ? null : body.title,
      author: body.author,
      url: body.url === undefined ? null : body.url,
      likes: body.likes
    })

    if (isNaN(blog.likes)) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.json(formatBlog(savedBlog))
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
      response.json(formatBlog(blog))
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

const formatBlog = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

module.exports = blogsRouter