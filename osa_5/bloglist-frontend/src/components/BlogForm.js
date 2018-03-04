import React from 'react'

const BlogForm = ({ onSubmit, onInputChange, title, author, url }) => (
  <form onSubmit={onSubmit}>
    <h3>Create new blog</h3>
    <div>
      Title: <input type='text' name='title' onChange={onInputChange} value={title}/>
    </div>
    <div>
      Author: <input type='text' name='author' onChange={onInputChange} value={author}/>
    </div>
    <div>
      Url: <input type='text' name='url' onChange={onInputChange} value={url}/>
    </div>
    <button>Create new blog</button>
  </form>
)

export default BlogForm