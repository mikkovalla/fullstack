import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blogi = {
  title: 'Elämä on laiffii ja sitä rataa',
  author: 'Matti Nykänen',
  likes: 10,
  url: 'masansivut.fi',
  user: {
    name: 'mattiNyk'
  }
}

it('renders title and author', () => {
  const blogComponent = shallow(<Blog blog={blog}/>)
  expect(blogComponent).toHaveText(`${blog.title} ${blog.author}`)
})


