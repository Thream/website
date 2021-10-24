import { render } from '@testing-library/react'

import { Footer } from './'

describe('<Footer />', () => {
  it('should render with appropriate link tag version', async () => {
    const version = '1.0.0'
    const { getByText } = render(<Footer version={version} />)
    const versionLink = getByText(`website v${version}`) as HTMLAnchorElement
    expect(getByText('Thream')).toBeInTheDocument()
    expect(versionLink).toBeInTheDocument()
    expect(versionLink.href).toEqual(
      `https://github.com/Thream/website/releases/tag/v${version}`
    )
  })
})
