/**
 * Handles async errors
 *
 * @param {object} error - catched error
 * @returns {string} error message
 */
export const errorHandler = (error) => {
  const errors = error?.data

  return errors || 'Oops! Something went wrong'
}

/**
 * Throw async errors
 *
 * @param {object} error - catched error
 * @returns {string} error message
 */
export const throwError = (error) => {
  throw errorHandler(error)
}
