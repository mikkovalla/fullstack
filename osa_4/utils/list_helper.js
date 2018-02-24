const dummy = (blogs) => {
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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}