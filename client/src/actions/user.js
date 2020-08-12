import axios from 'axios'

import { USER_ROUTES } from '../components/utils/misc'
import { LOGIN_USER } from './types'

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