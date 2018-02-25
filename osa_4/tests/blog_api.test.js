const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeAll(async () => {
  await Blog.remove({})

  for (blog of initialBlogs) {
    await new Blog(blog).save()
  }
})

test('Blogs are returned in json format', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('returns all blogs in database', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('check blog with same title exists', async () => {
  const response = await api.get('/api/blogs')
  const content = response.body.map(blogs => blogs.title)
  //blogi indeksissä 0 title on 'kuka mitä hä?'
  expect(content).toContain('kuka mitä hä?')
})

afterAll(() => {
  server.close()
})