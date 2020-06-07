/**
 * Deep merges two objets.
 * @param  {Object} object destination object
 * @param  {Object} source source obejct
 *
 * @returns {Object} new object
 */
export const merge = (obj, source) => {
  if (obj === source) return obj
  const newValue = {
    ...obj,
    ...source,
  }

  Object.entries(source).forEach(([key, value]) => {
    newValue[key] =
      obj[key] && typeof obj[key] === 'object' ? merge(obj[key], value) : value
  })

  return newValue
}

/**
 * Return a copy of an object excluding the given key, or array of keys.
 *
 * @param {object} obj - initial object
 * @param {(string|string[])} props - values to be omitted
 * @param {function} [fn] - an optional filter function
 */
export function omit(obj, props, fn) {
  if (!obj || obj.constructor !== Object) return {}
  if (typeof props === 'function') {
    fn = props
    props = []
  }
  if (typeof props === 'string') {
    props = [props]
  }
  const isFunction = typeof fn === 'function'
  const keys = Object.keys(obj)
  const res = {}
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const val = obj[key]
    if (
      !props ||
      (props.indexOf(key) === -1 && (!isFunction || fn(val, key, obj)))
    ) {
      res[key] = val
    }
  }
  return res
}

export function sortByName(options, field) {
  return options.sort((elementA, elementB) => {
    const nameA = elementA[field].toUpperCase()
    const nameB = elementB[field].toUpperCase()

    if (nameA < nameB) return -1
    else if (nameA > nameB) return 1
    else return 0
  })
}

export const verifyLength = (value, length) => {
  if (value.length >= length) {
    return true
  }
  return false
}

/**
 * Return date in format 02/02/2020 - 03/03/3030 or null
 *
 * @param {value} date
 */
export function formatDate(value) {
  const dateArray = JSON.parse(value)

  const result = dateArray.map((date) => {
    const timestamp = Date.parse(date)

    if (isNaN(timestamp)) {
      return null
    }

    const dateObj = new Date(timestamp)

    let day = String(dateObj.getDate())
    let month = String(dateObj.getMonth() + 1)
    const year = String(dateObj.getFullYear())

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join('/')
  })

  return result.join(' - ')
}

/**
 * Return metres from location slider
 *
 * @param {number} value - slider value
 * @param {boolean} kilometers - return kilometers
 *
 */
export const createSliderDistance = (value, kilometers = false) => {
  const min = 1000
  const max = 1000000

  const radius = (max / min) * value

  return kilometers ? radius / 1000 : radius
}

/**
 * Return string from two values
 *
 * @param {object} value - object with min and max values
 *
 */
export const stringFromMinMax = (values) => {
  const { min, max } = values || { min: '', max: ' ' }

  return JSON.stringify([min, max])
}
