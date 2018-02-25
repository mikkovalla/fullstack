const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
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

describe('deleting a blog', async () => {

  test('DELETE api/blogs/:id removes correct blog and returns right statuscode', async () => {
    const blogsTotal = await blogsInDb()
    const blogToDelete = blogsTotal[0]
    console.log('poistettava', blogToDelete.id)
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDeletion = await blogsInDb()
    const blogTitles = blogsAfterDeletion.map(blog => blog.title)

    expect(blogTitles).not.toContain(blogToDelete.title)
    expect(blogsAfterDeletion).toHaveLength(blogsTotal.length - 1)
  })
})

describe.only('when there is initially one user in the database', async () => {

  beforeAll(async () => {
    await User.remove({})
    const user = new User({
      username: 'uuseri',
      password: 'passutin'
    })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'uusin',
      name: 'uudempi',
      password: 'kaiakistauusin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with status 400 if username is not unique', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'uusin',
      name: 'nimmari',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({
      error: 'username must be unique'
    })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with statuscode 400 if password is under 3 characters', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'uusintahittia',
      name: 'lllll',
      password: 'aa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({
      error: 'password must be at over 3 characters'
    })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})

afterAll(() => {
  server.close()
})