import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      loginForm: {
        username: '',
        password: ''
      },
      loginError: null,
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  render() {
    return (
      <div>
        <BlogList blogs={this.state.blogs} />
      </div>
    );
  }
}

export default App;
