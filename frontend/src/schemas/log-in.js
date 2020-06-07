import { object } from 'yup'

import { email, password } from './fields'

const LogInSchema = object().shape({
  email,
  password,
})

export default LogInSchema
