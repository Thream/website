import { render } from '@testing-library/react'

import { SocialMedia, SocialMediaButton } from './'

describe('<SocialMediaButton />', () => {
  it('should render the social media', async () => {
    const socialMedia: SocialMedia = 'Discord'
    const { findByAltText } = render(
      <SocialMediaButton socialMedia={socialMedia} />
    )
    const socialMediaButton = await findByAltText(socialMedia)
    expect(socialMediaButton).toBeInTheDocument()
  })

  it('should render with a black text color with Google social media', async () => {
    const socialMedia: SocialMedia = 'Google'
    const { findByTestId } = render(
      <SocialMediaButton socialMedia={socialMedia} />
    )
    const button = await findByTestId('social-media-button')
    expect(button).toHaveStyle('color: #000')
  })
})
