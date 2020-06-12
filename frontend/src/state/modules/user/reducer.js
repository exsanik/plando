import createReducer from '~/state/utils/createReducer'
import { SET_USER, authUser } from './actions'

const initialState = {
  token: null,
  user: null,
  loading: false,
  loaded: false,
  error: true,
}

const userReducer = createReducer(initialState)({
  [SET_USER]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [authUser.REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [authUser.SUCCESS]: state => ({
    ...state,
    loading: false,
    loaded: true,
  }),
  [authUser.ERROR]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
})

export default userReducer
