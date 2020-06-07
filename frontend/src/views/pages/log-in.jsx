import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Container } from '@material-ui/core'
import { withFormik } from 'formik'

import MainLayout from '../layouts/Main'

import LogInForm from '~/views/components/LogInForm'
import LogInSchema from '~/schemas/log-in'
import { logInUser } from '~/state/modules/user'

import SuccessImage from '~/static/success.png'

const LogIn = ({ logInAction }) => (
  <MainLayout
    hideMenu
    bgColor="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
  >
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Container maxWidth="sm">
        <Box mb={4}>
          <Typography variant="subtitle1" align="center" color="primary">
            Welcome back! Hello again, it's good to see you. Let's get you
            signed back in
          </Typography>
        </Box>
        <Form logInAction={logInAction} />
        <Box display="flex" justifyContent="center">
          <img src={SuccessImage} alt="login" width="80%" />
        </Box>
      </Container>
    </Box>
  </MainLayout>
)

const Form = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: LogInSchema,
  mapPropsToStatus: () => ({}),
  handleSubmit: async (values, { setErrors, props: { logInAction } }) => {
    try {
      await logInAction(values)
    } catch (err) {
      setErrors(err)
    }
  },
})(LogInForm)

export default connect(null, { logInAction: logInUser })(LogIn)
