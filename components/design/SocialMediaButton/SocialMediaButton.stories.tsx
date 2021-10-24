import { Meta, Story } from '@storybook/react'

import { SocialMediaButton, SocialMediaButtonProps } from './SocialMediaButton'

const Stories: Meta = {
  title: 'SocialMediaButton',
  component: SocialMediaButton
}

export default Stories

const Template: Story<SocialMediaButtonProps> = (arguments_) => (
  <SocialMediaButton {...arguments_} />
)

export const Github = Template.bind({})
Github.args = { socialMedia: 'GitHub' }

export const Discord = Template.bind({})
Discord.args = { socialMedia: 'Discord' }

export const Google = Template.bind({})
Google.args = { socialMedia: 'Google' }
