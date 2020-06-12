import React, { useState } from 'react'
import { Form, withFormik } from 'formik'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Button, Box } from '@material-ui/core'

import TodoSchema from '~/schemas/todo'
import TextField from '~/views/components/TextField'
import MultEmailField from '~/views/components/MultEmailField'
import ChipsArray from '~/views/components/ChipsArray'
import DateField from '~/views/components/DateField'

import { createTodo } from '~/state/modules/todos'

const BigTodoForm = ({ user_email }) => {
  const [chipData, setChipData] = useState([user_email])

  return (
    <Form chipData={chipData}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField name="title" label="Title" type="text" />
        </Grid>
        <Grid item md={6} xs={12}>
          <DateField name="expire" label="Expire date" type="text" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            type="text"
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          {!!chipData.length && (
            <Box mb={1}>
              <ChipsArray
                data={chipData}
                setData={setChipData}
                userEmail={user_email}
              />
            </Box>
          )}
          <MultEmailField
            name="assigned"
            label="Assign"
            type="Text"
            setData={setChipData}
            data={chipData}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Create
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

const WithForm = withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: '',
    assigned: [],
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
  }),
  validationSchema: TodoSchema,
  mapPropsToStatus: () => ({}),
  handleSubmit: async (values, { setErrors, props: { createTodoAction } }) => {
    try {
      await createTodoAction(values)
    } catch (err) {
      setErrors(err)
    }
  },
})(BigTodoForm)

const mapStateToProps = state => {
  const user = state?.userData?.user || {}
  return { ...user }
}

export default connect(mapStateToProps, {
  createTodoAction: createTodo,
})(WithForm)
