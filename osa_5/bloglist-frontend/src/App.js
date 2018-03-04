import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: null,
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  handleLoginFieldChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value,
    })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    if(this.state.user) {
      return (
      <div>
        {this.state.user.name} logged in!
        <BlogList blogs={this.state.blogs} />
      </div>
      )
    }
      return (
        <Login 
        onSubmit={this.handleLogin} 
        error={this.state.error} 
        username={this.state.username}
        password={this.state.password} 
        onValueChange={this.handleLoginFieldChange}
        />
      )
    }
  }


export default App;
