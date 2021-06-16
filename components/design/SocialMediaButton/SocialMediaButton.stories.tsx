import { Meta, Story } from '@storybook/react'

import { SocialMediaButton, SocialMediaButtonProps } from './SocialMediaButton'

const ButtonStories: Meta = {
  title: 'SocialMediaButton',
  component: SocialMediaButton
}

export default ButtonStories

export const Main: Story<SocialMediaButtonProps> = (args) => (
  <SocialMediaButton {...args} />
)
Main.args = { socialMedia: 'GitHub' }
