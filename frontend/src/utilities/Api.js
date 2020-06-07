import axios from 'axios'

import { merge } from './functions'

class Api {
  config
  instance

  constructor(config) {
    this.config = config
    this.instance = axios.create(config)
    this.instance.interceptors.response.use(
      (response) => response,
      this.handleRefreshToken
    )
  }

  update(config) {
    this.instance = axios.create(merge(this.config, config))
  }

  appendErrorInterceptor = (interceptor) => {
    this.instance.interceptors.response.use((r) => r, interceptor)
  }

  makeRequest(method, url, options = {}) {
    const headers = { ...this.instance.defaults.headers, ...options.headers }
    return this.instance({
      ...options,
      method,
      url,
      headers,
      withCredentials: true,
    })
      .then((resp) => resp?.data)
      .catch(({ response }) => Promise.reject(response))
  }

  setAuthToken(authToken) {
    if (authToken) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${authToken}`
    } else delete this.instance.defaults.headers.common.Authorization
  }

  handleRefreshToken(err) {
    return new Promise((resolve, reject) => {
      const originalReq = err.config

      if (err.response.status === 401 && originalReq?._retry) {
        originalReq._retry = true

        const response = this.get(this.config.refreshUrl, this.config).then(
          (res) => {
            this.config.refreshAction(res)
            return axios(originalReq)
          }
        )

        resolve(response)
      }
      return reject(err)
    })
  }

  get = (url, config) => this.makeRequest('get', url, config)

  post = (url, config) => this.makeRequest('post', url, config)

  put = (url, config) => this.makeRequest('put', url, config)

  patch = (url, config) => this.makeRequest('patch', url, config)

  del = (url, config) => this.makeRequest('delete', url, config)

  requestHandlers = {
    get: this.get,
    post: this.post,
    put: this.put,
    patch: this.patch,
    del: this.del,
  }

  /**
   * Redux API helper for request -> success/fail flow
   * @param {ApiAction} apiAction - can be created using `createApiAction`
   * @param {Callback} cb - callback which executes requests
   *
   * @returns {ThunkAction} thunk, which executes provided promise and binds three dispatches for request, success and fail phase
   */
  thunk(apiAction, cb) {
    return (dispatch, getState) => {
      dispatch({ type: apiAction.REQUEST })

      return cb(this.requestHandlers, dispatch, getState)
        .then(({ data, status, headers }) => {
          dispatch({
            type: apiAction.SUCCESS,
            payload: {
              ...(data?.data ? data : { data }),
              status,
              headers,
            },
          })
          return data
        })
        .catch((error) => {
          dispatch({
            type: apiAction.FAIL,
          })
          console.error(error)
        })
    }
  }
}

export default Api
