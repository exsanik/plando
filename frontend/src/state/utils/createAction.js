const createAction = (type) => (payload) => {
  return payload ? { type, payload } : { type }
}

export default createAction
