import { render } from '@testing-library/react'

import { Icon, IconButton } from '../IconButton'

describe('<IconButton />', () => {
  it('should render with the icon', async () => {
    const icon: Icon = 'add'
    const { getByAltText } = render(<IconButton icon={icon} />)
    const iconImage = getByAltText(icon)
    expect(iconImage).toBeInTheDocument()
    expect(iconImage).toHaveAttribute('src', `/images/svg/icons/${icon}.svg`)
  })
})
