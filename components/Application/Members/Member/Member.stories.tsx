import { Meta, Story } from '@storybook/react'

import { Member as Component, MemberProps } from './Member'
import { memberExampleComplete } from '../../../../cypress/fixtures/members/member'

const Stories: Meta = {
  title: 'Member',
  component: Component
}

export default Stories

export const Member: Story<MemberProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Member.args = { member: memberExampleComplete }
