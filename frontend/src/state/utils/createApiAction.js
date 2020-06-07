const createApiAction = (name = '') => {
  const prefix = name.split('/').join(' / ')

  return {
    REQUEST: `${prefix} / REQUEST`,
    SUCCESS: `${prefix} / SUCCESS`,
    FAIL: `${prefix} / FAIL`,
  }
}

export default createApiAction
