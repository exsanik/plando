import createReducer from '~/state/utils/createReducer'
import { fetchTodos, SET_DONE } from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
}

const todoReducer = createReducer(initialState)({
  [fetchTodos.REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [fetchTodos.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    loaded: true,
  }),
  [fetchTodos.ERROR]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
  [SET_DONE]: (state, { payload }) => {
    const todoIndex = state.data.findIndex(({ id }) => id === payload)
    if (todoIndex !== -1) {
      const newTodo = state.data[todoIndex]
      newTodo.is_done = !newTodo.is_done
      return {
        ...state,
        data: [
          ...state.data.slice(0, todoIndex),
          newTodo,
          ...state.data.slice(todoIndex + 1),
        ],
      }
    } else {
      return { ...state }
    }
  },
})

export default todoReducer
