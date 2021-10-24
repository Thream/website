import { render } from '@testing-library/react'

import { Guilds } from './'

describe('<Guilds />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Guilds path={{ channelId: 1, guildId: 2 }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
