import React from 'react'

class Blog extends React.Component {

  handleBlogClick = () => {
    this.props.onClick(this.props.blog.id)
  }

  handleBlogLike = () => {
    this.props.onLike(this.props.blog)
  }

  render () {
    const tyylit = {
      border: '2px solid blue',
      padding: '10px 5px',
      margin: '10px 5px'
    }
    const { blog } = this.props
    //console.log('blog', blog.user)

    return (
      <div style={tyylit}>
        <div onClick={this.handleBlogClick}>
          {blog.title} {blog.author}
        </div>
        {blog.avaa && (
          <div>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              {blog.likes} likes <button type='button' onClick={this.handleBlogLike}>like</button>
            </div>
            <div>
              added by {blog.user.name}
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Blog