import React from 'react'
import { Form } from 'formik'

import { Grid, Button } from '@material-ui/core'

import TextField from '~/views/components/TextField'

const SignUpForm = ({ status }) => {
  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name="name" id="name" label="Name" type="text" />
        </Grid>
        <Grid item xs={12}>
          <TextField name="email" id="email" label="Email" type="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            id="password"
            label="Password"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password_confirmation"
            id="password_confirmation"
            label="Confirm password"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

export default SignUpForm
