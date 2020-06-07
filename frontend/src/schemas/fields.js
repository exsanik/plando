import { string } from 'yup'

import './methods'

export const email = string()
  .email('Invalid email')
  .required('Email is required')

export const password = string()
  .min(8, 'Password is too short!')
  .max(50, 'Password is too long!')
  .required('Password is required')

export const name = string().required('Name is required')
