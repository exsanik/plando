import { object, string } from 'yup'

const TodoSchema = object().shape({
  title: string().required('Title is required!'),
  description: string(),
})

export default TodoSchema
