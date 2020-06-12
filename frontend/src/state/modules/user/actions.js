import jwtDecode from 'jwt-decode'

import createAction from '~/state/utils/createAction'
import createApiAction from '~/state/utils/createApiAction'
import Plando from '~/services/Plando'

import { throwError } from '~/utilities/errorHandler'
import history from '~/history'
import { LOG_OUT_USER } from '~/state/store'

export const SET_USER = 'user / SET_USER'
export const AUTHORIZE_USER = 'user / AUTHORIZE'

const setUser = createAction(SET_USER)
const logOut = createAction(LOG_OUT_USER)
export const authUser = createApiAction(AUTHORIZE_USER)
export const authFail = createAction(authUser.SUCCESS)

export const authorize = token => dispatch => {
  try {
    dispatch(createAction(authUser.REQUEST)())
    const user = jwtDecode(token)
    Plando.setAuthToken(token)
    dispatch(setUser({ user, token }))
    dispatch(createAction(authUser.SUCCESS)())
  } catch (err) {
    console.log('err', err)
  }
}

export const signUpUser = user => async dispatch => {
  try {
    const { token } = await Plando.createUser(user)
    dispatch(authorize(token))
  } catch (err) {
    throw throwError(err)
  }
}

export const logInUser = user => async dispatch => {
  try {
    const { access_token } = await Plando.signInUser(user)
    dispatch(authorize(access_token))
  } catch (err) {
    throw throwError(err)
  }
}

export const logOutUser = () => async dispatch => {
  try {
    await Plando.logoutUser()
    dispatch(logOut())
    Plando.setAuthToken(null)
    history.push('/')
  } catch (err) {
    console.log('err', err)
    throw throwError(err)
  }
}

export const refreshToken = () => async dispatch => {
  try {
    const { access_token } = await Plando.refreshTokens()
    dispatch(authorize(access_token))
  } catch (err) {
    dispatch(authFail())
    throw throwError(err)
  }
}
