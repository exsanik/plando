export const getSortedTodos = state =>
  state?.todos?.data
    .filter(({ is_done }) => !is_done)
    .sort(
      ({ expire_at: expire_atA }, { expire_at: expire_atB }) =>
        new Date(expire_atA) - new Date(expire_atB)
    )

export const getTodosState = ({ todos: { loading, loaded, error } }) => ({
  loading,
  loaded,
  error,
})
