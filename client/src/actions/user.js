import axios from 'axios'

import { USER_ROUTES } from '../components/utils/misc'
import { 
  LOGIN_USER, 
  REGISTER_USER,
  AUTH_USER 
} from './types'

export const loginUser = (data) => {
  const request = axios.post(`${USER_ROUTES}/login`, data)
                    .then(response => 
                      response.data
                    )
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export const registerUser = (data) => {
  const request = axios.post(`${USER_ROUTES}/register`, data)
                    .then(response => 
                      response.data
                    )
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export const auth = () => {
  const request = axios.get(`${USER_ROUTES}/auth`)
                    .then(response => 
                      response.data
                    ).catch(error => error.response)
  return {
    type: AUTH_USER,
    payload: request
  }
}