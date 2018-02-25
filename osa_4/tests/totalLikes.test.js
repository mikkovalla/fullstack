const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}]

const blogs = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
},
{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
},
{
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
},
{
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
},
{
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
},
{
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}
]

describe('total likes', () => {

  test('empty list is equal to zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('multiple blogs likes calculated correctly', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

})

describe('favorite blog', () => {
  test('if there are no blogs then result is null', () => {
    expect(listHelper.favoriteBlog(emptyList)).toEqual(null)
  })

  test('if there is only one blog its likes number is returned', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('return blog with most likes from list of many', () => {
    //eniten likejä saaneen blogin indeksi listassa on 2
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {

  test('if there are no blogs then result is null', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual(null)
  })

  test('returns author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('list with one blog returns that blogs author and value 1', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
})

describe('most likes', () => {

  test('when there is no blogs result is null', () => {
    expect(listHelper.mostLikes(emptyList)).toBe(null)
    console.log('ei blogeja',listHelper.mostLikes(emptyList))
  })

  test('list with one blog returns that blogs author and likes', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
    console.log('yksi blogi',listHelper.mostLikes(listWithOneBlog))
  })

  test('returns author with most likes and total likes count', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
    console.log('kaikki blogit',listHelper.mostLikes(blogs))
  })
})