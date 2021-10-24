import { Meta, Story } from '@storybook/react'

import { Sidebar as Component, SidebarProps } from './Sidebar'

const Stories: Meta = {
  title: 'Sidebar',
  component: Component
}

export default Stories

export const Sidebar: Story<SidebarProps> = (arguments_) => {
  return <Component {...arguments_} />
}
