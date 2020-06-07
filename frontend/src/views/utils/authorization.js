import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getLoggedInUser, getUserEmail } from '~/state/modules/user/selectors'

export const Auth = {
  Shared: 'SHARED',
  Logged: 'LOGGED',
  Unlogged: 'UNLOGGED',
}

export default (auth) => (Wrapped) => {
  const authorized = ({ logged, confirmed, email, ...props }) => {
    const {
      match: { url },
    } = props

    let redirect = null

    if (auth === Auth.Shared) redirect = null
    else if (logged === Auth.Logged && auth !== Auth.Logged) {
      redirect = '/dashboard'
    } else if (logged === Auth.Unlogged && auth !== Auth.Unlogged) {
      redirect = '/'
    } else redirect = null

    if (redirect && url !== redirect) return <Redirect to={redirect} />

    return <Wrapped {...props} />
  }

  const mapStateToProps = (state) => ({
    logged: getLoggedInUser(state) ? Auth.Logged : Auth.Unlogged,
    // confirmed: getUserConfirmed(state),
    email: getUserEmail(state),
  })

  return connect(mapStateToProps)(authorized)
}
