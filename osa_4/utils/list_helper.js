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

module.exports = {
  dummy,
  totalLikes
}