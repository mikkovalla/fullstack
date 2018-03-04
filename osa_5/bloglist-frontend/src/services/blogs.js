import axios from 'axios'
const baseUrl = '/api/blogs'

let bearerToken = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: bearerToken
    }
  })
  return response.data
}

const setToken = (token) => {
  bearerToken = `bearer ${token}`
}

const update = async ({ id, user: {_id: user }, ...blog}) => {
  const uri = `${baseUrl}/${id}`
  const response = await axios.put(uri, {...blog, user}, {
    headers: {
      Authorization: bearerToken
    }
  })
  return response.data
}

export default { getAll, create, setToken, update }