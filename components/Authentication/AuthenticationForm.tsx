import classNames from 'classnames'
import { Form, ReactFormProps } from 'react-component-form'

export const AuthenticationForm: React.FC<ReactFormProps> = (props) => {
  const { className, children, ...rest } = props

  return (
    <Form className={classNames('w-4/6 max-w-xs', className)} {...rest}>
      {children}
    </Form>
  )
}
