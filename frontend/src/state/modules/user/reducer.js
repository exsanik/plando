import createReducer from '~/state/utils/createReducer'
import { SET_USER } from './actions'

const initialState = {
  token: null,
  user: null,
}

const userReducer = createReducer(initialState)({
  [SET_USER]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
})

export default userReducer
