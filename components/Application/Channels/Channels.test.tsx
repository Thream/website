import { render } from '@testing-library/react'

import { Channels } from './'

describe('<Channels />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Channels path={{ channelId: 1, guildId: 2 }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
