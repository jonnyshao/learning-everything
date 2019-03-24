import axios from '../libs/Request'

export const getUser = () => {
  return axios.request({
    url: '/user'
  })
}
export const login = (username) => {
  return axios.request({
    url: '/user',
    method: 'post',
    data: {
      username
    }
  })
}
export const validate = () => {
  return axios.request({
    url: '/validate'
  })
}
