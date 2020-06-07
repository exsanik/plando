import React from 'react'
import { TextField as TextInput } from '@material-ui/core'
import { useField } from 'formik'

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
      inputProps={{ 'data-required': required, readOnly }}
      {...field}
      {...props}
    />
  )
}

export default TextField
