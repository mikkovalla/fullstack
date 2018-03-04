import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Testaamista frontendissä!!!!',
  author: 'Matti Nykänen',
  likes: 69
}

it("renders title", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(blog.title);
})

it("renders author", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(blog.author);
})

it("renders likes", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(`${blog.likes} likes`);
})
