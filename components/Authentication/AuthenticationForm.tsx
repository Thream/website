import classNames from 'clsx'
import type { FormProps } from 'react-component-form'
import { Form } from 'react-component-form'

export const AuthenticationForm: React.FC<FormProps> = (props) => {
  const { className, children, ...rest } = props

  return (
    <Form
      className={classNames('w-4/6 max-w-xs', className)}
      noValidate
      {...rest}
    >
      {children}
    </Form>
  )
}
