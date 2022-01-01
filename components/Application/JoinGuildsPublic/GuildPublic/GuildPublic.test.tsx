import { render } from '@testing-library/react'

import { GuildPublic } from './GuildPublic'
import { guildExample } from '../../../../cypress/fixtures/guilds/guild'

describe('<GuildPublic />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GuildPublic
        guild={{
          ...guildExample,
          membersCount: 1
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
