import jwtDecode from 'jwt-decode'

import createAction from '~/state/utils/createAction'
import Plando from '~/services/Plando'

import { throwError } from '~/utilities/errorHandler'
import history from '~/history'
import { LOG_OUT_USER } from '~/state/store'

export const SET_USER = 'user / SET_USER'

const setUser = createAction(SET_USER)
const logOut = createAction(LOG_OUT_USER)

export const authorize = (token) => (dispatch) => {
  const user = jwtDecode(token)
  Plando.setAuthToken(token)
  dispatch(setUser({ user, token }))
}

export const signUpUser = (user) => async (dispatch) => {
  try {
    const { token } = await Plando.createUser(user)
    dispatch(authorize(token))
  } catch (err) {
    throw throwError(err)
  }
}

export const logInUser = (user) => async (dispatch) => {
  try {
    const { access_token } = await Plando.signInUser(user)
    dispatch(authorize(access_token))
  } catch (err) {
    throw throwError(err)
  }
}

export const logOutUser = () => async (dispatch) => {
  try {
    await Plando.logoutUser()
    dispatch(logOut())
    Plando.setAuthToken(null)
    history.push('/')
  } catch (err) {
    throw throwError(err)
  }
}

export const refreshToken = () => async (dispatch) => {
  try {
    const { access_token } = await Plando.refreshTokens()
    dispatch(authorize(access_token))
  } catch (err) {
    throw throwError(err)
  }
}
