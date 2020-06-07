import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Box, CircularProgress } from '@material-ui/core'

import { MainPage, LogInPage, SignUpPage, DashboardPage } from './views/pages'
import auth, { Auth as AuthConst } from '~/views/utils/authorization'
import { refreshToken } from '~/state/modules/user'

import './index.css'

const unlogged = auth(AuthConst.Unlogged)
const shared = auth(AuthConst.Shared)
const logged = auth(AuthConst.Logged)

const Auth = {
  LogIn: unlogged(LogInPage),
  SignUp: unlogged(SignUpPage),
  Main: unlogged(MainPage),
  // ForgotPassword: unlogged(ForgotPassword),
  // ForgotPasswordVerify: unlogged(Verify),
  // ResetPassword: unlogged(ResetPassword),

  // SignUpVerify: logged(Verify),
  Dashboard: logged(DashboardPage),
}

const App = ({ refreshTokenAction }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        await refreshTokenAction()
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [refreshTokenAction, loading])

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          width="100vw"
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Switch>
          <Route path="/" exact component={Auth.Main} />
          <Route path="/log-in" exact component={Auth.LogIn} />
          <Route path="/sign-up" exact component={Auth.SignUp} />

          <Route path="/dashboard" exact component={Auth.Dashboard} />

          <Redirect to="/" />
        </Switch>
      )}
    </>
  )
}

export default connect(null, { refreshTokenAction: refreshToken })(App)
