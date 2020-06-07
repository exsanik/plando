import Api from '~/utilities/Api'

import { authorize } from '~/state/modules/user'
import store from '~/state/store'

class Plando extends Api {
  /**
   * Create a new user
   */
  createUser = (user) => this.post('/api/sign-up', { data: user })

  /**
   * @param {email: string, password: string} user
   */
  signInUser = (user) => this.post('/api/log-in', { data: user })

  /**
   * Request to refresh access token
   */
  refreshTokens = () => this.get('/api/refresh-token')

  /**
   * Logout user
   */
  logoutUser = () => this.get('/api/log-out')
}

export default new Plando({
  baseURL: process.env.REACT_APP_PLANDO_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  refreshUrl: '/api/refresh-token',
  refreshAction: ({ refresh_token }) =>
    store.dispatch(authorize(refresh_token)),
})
