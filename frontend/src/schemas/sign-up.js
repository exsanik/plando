import { object } from 'yup'

import { email, password, name } from './fields'

const SignupSchema = object().shape({
  email,
  password,
  name,
  password_confirmation: password
    .passwordConfirmation('Passwords are not the same!')
    .required('Password confirmation is required!'),
})

export default SignupSchema
