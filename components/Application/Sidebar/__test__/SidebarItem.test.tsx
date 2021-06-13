import { render } from '@testing-library/react'

import { SidebarItem } from '../SidebarItem'

describe('<SidebarItem />', () => {
  it('should render', async () => {
    const { getByText } = render(<SidebarItem>Item</SidebarItem>)
    expect(getByText('Item')).toBeInTheDocument()
  })
})
