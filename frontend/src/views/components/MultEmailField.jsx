import React, { useCallback, useState, useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import { string } from 'yup'
import throttle from 'lodash.throttle'
import { TextField as TextInput } from '@material-ui/core'

const MultEmailField = ({ required, readOnly, setData, data, ...props }) => {
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const { onChange, onBlur, name } = field
  const [currentValue, setCurrentValue] = useState('')

  const isError = meta.touched && meta.error

  useEffect(() => {
    if (currentValue === '') setFieldValue(name, data)
  }, [currentValue])

  const handleChange = useCallback(
    throttle(e => {
      const emailSchema = string().email()

      if (
        currentValue &&
        currentValue.trim().length > 4 &&
        emailSchema.isValidSync(currentValue.trim())
      ) {
        setData(currData => [...new Set([...currData, currentValue.trim()])])
        setCurrentValue('')
      }
    }, 500),
    [setCurrentValue, setData, currentValue]
  )

  return (
    <TextInput
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? meta.error : null}
      InputLabelProps={{ required }}
      inputProps={{
        readOnly,
      }}
      value={currentValue}
      onKeyPress={event => {
        if (event.key === ' ') handleChange()
      }}
      onChange={e => setCurrentValue(e.target.value)}
      onBlur={e => {
        onBlur(e)
        handleChange()
      }}
      name={name}
      {...props}
    />
  )
}

export default MultEmailField
