import { render } from '@testing-library/react'
import { channelExample } from 'cypress/fixtures/channels/channel'

import { Channel } from './Channel'

describe('<Channel />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Channel channel={channelExample} path={{ channelId: 1, guildId: 1 }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
