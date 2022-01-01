import { render } from '@testing-library/react'

import { Guild } from './Guild'
import { guildExample } from '../../../../cypress/fixtures/guilds/guild'

describe('<Guild />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Guild
        guild={{
          ...guildExample,
          defaultChannelId: 1
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
