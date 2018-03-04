import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, logout, blogClick }) => (
  <div>
    <h1>Blogs</h1>
    <div>
    <h5>{user} logged in! <button onClick={logout}>logout</button> </h5> 
    </div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} onClick={blogClick}/>)}
  </div>
)

export default BlogList