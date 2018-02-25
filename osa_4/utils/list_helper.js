const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, likes) => {
    return sum + likes
  }

  const result = blogs.map(blog => blog.likes).reduce(reducer, 0)

  return result
}

const favoriteBlog = (blogs) => {
  const parasBlogi = blogs
    .reduce((paras, vertailtava) =>
      paras === null || vertailtava.likes > paras.likes ? vertailtava : paras, null)

  return parasBlogi
}

const mostBlogs = (blogs) => {

  const reducer = (blogs, author) => {
    return ({
      ...blogs,
      [author]: (blogs[author] || 0) + 1
    })
  }

  //thank you MPJ/FunFunFunction youtube channel
  const authorBlogCount = blogs
    .map(blog => blog.author)
    .reduce(
      reducer, {})

  const theMost = Object.keys(authorBlogCount)
    .map(author => ({
      author: author,
      blogs: authorBlogCount[author]
    }))
    .reduce((paras, vertailtava) =>
      paras === null || vertailtava.blogs > paras.blogs ? vertailtava : paras, null)

  return theMost
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}