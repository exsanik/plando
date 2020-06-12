import React from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik'

import { Box, Typography, makeStyles } from '@material-ui/core'

import MainLayout from '~/views/layouts/Main'

import SignupSchema from '~/schemas/sign-up'
import SignUpForm from '~/views/components/SignUpForm'
import { signUpUser } from '~/state/modules/user'

import SuccessImage from '~/static/success.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  formBlock: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}))

const SignUp = ({ signUpAction }) => {
  const classes = useStyles()

  return (
    <MainLayout
      hideMenu
      bgColor="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
    >
      <Box className={classes.root}>
        <Box mb={4}>
          <Typography variant="subtitle1" align="center" color="primary">
            Welcome! Sign up and become the most productive person in the world!
          </Typography>
        </Box>
        <Box className={classes.formBlock}>
          <Box>
            <img src={SuccessImage} alt="success" width="100%" />
          </Box>
          <Form signUpAction={signUpAction} />
        </Box>
      </Box>
    </MainLayout>
  )
}

const Form = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }),
  validationSchema: SignupSchema,
  mapPropsToStatus: () => ({}),
  handleSubmit: async (values, { setErrors, props: { signUpAction } }) => {
    try {
      await signUpAction(values)
    } catch (err) {
      setErrors(err)
    }
  },
})(SignUpForm)

export default connect(null, { signUpAction: signUpUser })(SignUp)
