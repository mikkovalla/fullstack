const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const Blog = require('../models/blog')
const {
  format,
  initialBlogs,
  nonExistingId,
  blogsInDb
} = require('./tests_helper')
const api = supertest(app)

const newBlog = {
  title: 'Yo Yo All',
  author: 'Me myself and I',
  url: 'whowhenwhere.com',
  likes: 6
}

describe('when there are some blogs saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})

    for (blog of initialBlogs) {
      await new Blog(blog).save()
    }
  })

  test('all blogs are returned as JSON -> GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const allTitles = response.body.map(blog => blog.title)
    blogsInDatabase.forEach(blog => {
      expect(allTitles).toContain(blog.title)
    })
  })

  test('individual blog is returned as JSON -> GET /api/blogs/:id', async () => {
    const blogsInDatabase = await blogsInDb()
    const oneSingleBlog = blogsInDatabase[0]

    const response = await api.get(`/api/blogs/${oneSingleBlog.id}`).expect(200).expect('Content-Type', /application\/json/)

    expect(response.body.title).toEqual(oneSingleBlog.title)
  })

  test('nonexisting or invalid id GET /api/blogs/:id returns status 404', async () => {
    const nonValidId = await nonExistingId()
    await api.get(`/api/blogs/${nonValidId}`).expect(404)
  })

  test('invalid id GET /api/blogs/:id returns status 400', async () => {
    const invalidId = '829728964964926492'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})
describe('adding new blogs', async () => {

  test('new blog can be added by POST /api/blogs with valid data', async () => {
    const totalBlogsAtBeginning = await blogsInDb()

    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

    const totalBlogsAfterAddition = await blogsInDb()

    //console.log('vastaus', response.body)
    //console.log('kaikki pituus', initialBlogs.length)

    const titles = totalBlogsAfterAddition.map(blog => blog.title)

    expect(totalBlogsAfterAddition).toHaveLength(totalBlogsAtBeginning.length + 1)
    expect(titles).toContain('Yo Yo All')
  })

  test('if likes is undefined, put likes equal to 0', async () => {
    const liketonBlogi = {
      title: 'liketonBlogi',
      author: 'liketonBloggaaja',
      url: 'liketonBlogi.fi'
    }

    await api.post('/api/blogs').send(liketonBlogi)
    const totalBlogsAfterAddition = await blogsInDb()

    const vikaBlogi = totalBlogsAfterAddition.find(blogg => blogg.title === liketonBlogi.title)
    //console.log('vikablogi', vikaBlogi)
    expect(vikaBlogi.likes).toEqual(0)
    expect(vikaBlogi.title).toEqual('liketonBlogi')
  })

  test('POST /api/blogs cannot add new blog without url or title', async () => {
    const totalBlogsAtBeginning = await blogsInDb()
    const virheellinenBlogi = {
      author: 'tuut tuut',
      likes: 666
    }
    await api.post('/api/blogs').send(virheellinenBlogi).expect(400)
    const totalBlogsAfterAddition = await blogsInDb()
    expect(totalBlogsAfterAddition.length).toEqual(totalBlogsAtBeginning.length)

  })
})

afterAll(() => {
  server.close()
})