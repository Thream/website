import { render } from '@testing-library/react'

import { Avatar } from '../Avatar'

describe('<Avatar />', () => {
  it('should render', async () => {
    const altAttribute = 'avatar'
    const { getByAltText } = render(
      <Avatar width={50} height={50} src='/avatar.png' alt={altAttribute} />
    )
    expect(getByAltText(altAttribute)).toBeInTheDocument()
  })
})
