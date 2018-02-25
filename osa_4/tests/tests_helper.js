const Blog = require('../models/blog')

const initialBlogs = [{
  title: 'kuka mitä hä?',
  author: 'D.D. Trump',
  url: 'whitehouse.org',
  likes: -100
},
{
  title: 'Javascript pour les nuls',
  author: 'Elon Zuckerberg',
  url: 'france.fr',
  likes: 8
},
{
  title: 'mä en juo!',
  author: 'Matti Nykänen',
  url: 'nykasenmasa.fi',
  likes: 9
}
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}
const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb
}