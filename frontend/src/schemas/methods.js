import { addMethod, string } from 'yup'

addMethod(string, 'passwordConfirmation', function (message) {
  return this.test('passwordConfirmation', message, function (value) {
    const { password } = this?.parent

    return value === password
  })
})
