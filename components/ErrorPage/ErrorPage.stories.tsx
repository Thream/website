import { Meta, Story } from '@storybook/react'

import { ErrorPage as Component, ErrorPageProps } from './ErrorPage'

const Stories: Meta = {
  title: 'ErrorPage',
  component: Component
}

export default Stories

export const ErrorPage: Story<ErrorPageProps> = (arguments_) => {
  return <Component {...arguments_} />
}
ErrorPage.args = { message: 'message content', statusCode: 404 }
