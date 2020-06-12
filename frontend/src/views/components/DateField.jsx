import React, { useState } from 'react'
import { useField, useFormikContext } from 'formik'
import moment from 'moment'

import { DateTimePicker } from '@material-ui/pickers'
import { FormControl, FormHelperText } from '@material-ui/core'

const DateField = ({ required, ...props }) => {
  const dateFormat = 'DD.MM.YYYY hh:mm'

  const { setFieldValue } = useFormikContext()
  const [currentDate, setCurrentDate] = useState(moment().format(dateFormat))
  const [{ onChange, value, name }, meta] = useField(props)

  const isError = meta.touched && meta.error

  return (
    <FormControl variant="outlined" fullWidth error={isError}>
      <DateTimePicker
        inputVariant="outlined"
        onChange={date => {
          setCurrentDate(date)
          setFieldValue(name, date.format('YYYY-MM-DD HH:mm:ss'))
        }}
        InputLabelProps={{ required }}
        animateYearScrolling
        value={currentDate}
        format={dateFormat}
        inputProps={{ name }}
        {...props}
      />
      {isError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  )
}

export default DateField
