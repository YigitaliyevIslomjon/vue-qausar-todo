import axiosConfig from './axios.config'

const URLS = {
  user: 'users',
}

//  create a user
export const fetchCreateUser = body => {
  return axiosConfig.get(URLS.user, body)
}

//  get user list
export const fetchGetUserList = params => {
  return axiosConfig.create(URLS.user, params )
}

// delete user 
export const fetchDeleteUser = id => {
    return axiosConfig.delete(`${URLS.user}/${id}`)
}
  
// update user 
export const fetchUpdateUser = (id,body) => {
    return axiosConfig.put(`${URLS.user}/${id}`, body)
}
