import React from 'react'
import { useField } from 'formik'
import { TextField as TextInput } from '@material-ui/core'

const TextField = ({ required, readOnly, ...props }) => {
  const [field, meta] = useField(props)

  const isError = meta.touched && meta.error

  return (
    <TextInput
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? meta.error : null}
      InputLabelProps={{ required }}
      inputProps={{ readOnly }}
      {...field}
      {...props}
    />
  )
}

export default TextField
