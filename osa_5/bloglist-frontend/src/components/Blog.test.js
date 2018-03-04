import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blog = {
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

it('toggles blog details on click', () => {
  const details = jest.fn()

  const blogComponent = shallow(
    <Blog blog={blog} onClick={blogClick} />
  )
  const contents = blogComponent.children()
  contents.simulate('click')
  expect(details).toHaveBeenCalledTimes(1)
})


