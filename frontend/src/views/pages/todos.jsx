import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'

import TodoCard from '~/views/components/TodoCard'
import MainLayout from '~/views/layouts/Main'

import { getTodosState } from '~/state/modules/todos/selectors'
import useRouter from '~/views/utils/hooks/useRouter'

const Todos = ({ todos }) => {
  const { pathname } = useRouter()
  let outputTodos = todos
  if (pathname === '/done') {
    outputTodos = todos.filter(({ is_done }) => !!is_done)
  } else if (pathname === '/planed') {
    outputTodos = todos.filter(({ is_done }) => !is_done)
  }

  return (
    <MainLayout>
      {outputTodos.map((todo, idx) => (
        <Box m={1}>
          <TodoCard key={idx} {...todo} />
        </Box>
      ))}
    </MainLayout>
  )
}

const mapStateToProps = state => ({
  todos: state.todos.data,
  todosState: getTodosState(state),
})

export default connect(mapStateToProps)(Todos)
