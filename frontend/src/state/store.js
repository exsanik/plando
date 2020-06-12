import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import * as reducers from './modules'

const composeEnhancer = composeWithDevTools({})
export const LOG_OUT_USER = 'user / LOG_OUT_USER'

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_USER) state.userData = null

  return combineReducers({
    ...reducers,
  })(state, action)
}

const initStore = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
)

export default initStore
