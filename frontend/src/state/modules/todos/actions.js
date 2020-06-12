import createAction from '~/state/utils/createAction'
import createApiAction from '~/state/utils/createApiAction'
import Plando from '~/services/Plando'

import { throwError } from '~/utilities/errorHandler'
import history from '~/history'

export const FETCH_TODOS = 'todos / FETCH'
export const SET_DONE = 'todos / SET_DONE'

export const setDone = createAction(SET_DONE)
export const fetchTodos = createApiAction(FETCH_TODOS)

export const getTodos = () =>
  Plando.thunk(
    fetchTodos,
    async () => {
      try {
        const todos = await Plando.getTodos()
        return { data: todos }
      } catch (err) {
        throw throwError(err)
      }
    },
    {}
  )

export const createTodo = todoItem => async dispatch => {
  try {
    await Plando.createTodo(todoItem)
    dispatch(getTodos())
  } catch (err) {
    console.log('err', err)
  }
}

export const deleteTodo = id => async dispatch => {
  try {
    await Plando.deleteTodo(id)
    dispatch(getTodos())
  } catch (err) {
    throw throwError(err)
  }
}

export const handleDone = id => async dispatch => {
  try {
    dispatch(setDone(id))
    await Plando.handleDone(id)
    dispatch(getTodos())
  } catch (err) {
    throw throwError(err)
  }
}
