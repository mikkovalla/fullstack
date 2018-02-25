const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const newBlog =
{
  title: 'Yo Yo All',
  author: 'Me myself and I',
  url: 'whowhenwhere.com',
  likes: 6
}

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

test('new blog can be added', async () => {

  await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log('vastaus', response.body)
  console.log('kaikki pituus', initialBlogs.length)

  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Yo Yo All')
})

test('if likes is undefined, put likes equal to 0', async () => {
  const liketonBlogi = {
    title: 'liketonBlogi',
    author: 'liketonBloggaaja',
    url: 'liketonBlogi.fi'
  }

  await api.post('/api/blogs').send(liketonBlogi)
  const response = await api.get('/api/blogs')

  const vikaBlogi = response.body.find(blogg => blogg.title === liketonBlogi.title)
  console.log('vikablogi', vikaBlogi)
  expect(vikaBlogi.likes).toEqual(0)
  expect(vikaBlogi.title).toEqual('liketonBlogi')
})

afterAll(() => {
  server.close()
})