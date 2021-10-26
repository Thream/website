import { Meta, Story } from '@storybook/react'

import { CreateGuild as Component } from './CreateGuild'

const Stories: Meta = {
  title: 'CreateGuild',
  component: Component
}

export default Stories

export const CreateGuild: Story = (arguments_) => {
  return <Component {...arguments_} />
}
CreateGuild.args = {}
