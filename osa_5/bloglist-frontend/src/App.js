import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import BlogForm from "./components/BlogForm"
import Notifications from "./components/Notifications"
import Togglable from "./components/Togglable"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  notification = (message, success = true) => {
    this.setState({
      notification: {
        message,
        success
      }
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 5000)
  }

  componentDidMount() {
    const loggedUserAsJson = window.localStorage.getItem('user')
    if(loggedUserAsJson) {
      const user = JSON.parse(loggedUserAsJson)
      this.setState({
        user
      })
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  handleFieldChange = (event) => {
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
      
      window.localStorage.setItem('user', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)
      this.notification(`Welcome back ${user.name}!`)
    } catch(error) {
      console.log('handleLogin e', error)
      this.notification(`Wrong username or password!`, false)
    }
  }

  handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const uusiBlogi = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        user: this.state.user
      })
      this.setState(vanhat => ({
        blogs: [...vanhat.blogs, uusiBlogi],
        title: '',
        author: '',
        url: ''
      }))
      this.notification(
        `a new blog '${uusiBlogi.title}' by ${uusiBlogi.author} added`
      )
    } catch (error) {
      console.log('blogin lisäys error', error)
      this.notification(error.response.data.message, false)
    }

  }

  handleLogout = () => {
    window.localStorage.clear()
    this.setState({
      user: null
    })
  }

  render() {
    if(this.state.user) {
      return (
      <div>
        {this.state.notification && (
          <Notifications {...this.state.notification} />
        )}
        <BlogList blogs={this.state.blogs} user={this.state.user.name} logout={this.handleLogout} />
        <Togglable nayta='create blog' piilota='hide form'>
          <BlogForm onSubmit={this.handleBlogCreation} onInputChange={this.handleFieldChange} title={this.state.title} author={this.state.author} url={this.state.url} />
        </Togglable>       
      </div>
      )
    }
      return (
        <div>
          {this.state.notification && (
            <Notifications {...this.state.notification} />
          )}
          <Login 
        onSubmit={this.handleLogin} 
        username={this.state.username}
        password={this.state.password} 
        onValueChange={this.handleFieldChange}
        />
        </div>
        
      )
    }
  }


export default App;
