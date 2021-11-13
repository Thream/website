import { render } from '@testing-library/react'

import { Guild } from './Guild'

describe('<Guild />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Guild
        guild={{
          id: 1,
          name: 'GuildExample',
          description: 'guild example.',
          icon: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          membersCount: 1
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
