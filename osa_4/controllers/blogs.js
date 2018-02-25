const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

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