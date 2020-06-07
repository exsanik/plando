import React from 'react'
import { Form } from 'formik'

import { Grid, Button } from '@material-ui/core'

import TextField from '~/views/components/TextField'

const LogInForm = () => (
  <Form>
    <Grid container spacing={2}>
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
        <Button fullWidth variant="contained" color="primary" type="submit">
          Log in
        </Button>
      </Grid>
    </Grid>
  </Form>
)

export default LogInForm
