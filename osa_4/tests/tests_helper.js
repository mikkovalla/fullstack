const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}