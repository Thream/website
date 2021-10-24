import { render } from '@testing-library/react'

import { SidebarList } from '../SidebarList'

describe('<SidebarList />', () => {
  it('should render', async () => {
    const { getByText } = render(<SidebarList>List Item</SidebarList>)
    expect(getByText('List Item')).toBeInTheDocument()
  })
})
