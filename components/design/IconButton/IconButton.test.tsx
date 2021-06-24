import { render } from '@testing-library/react'
import { CogIcon } from '@heroicons/react/solid'

import { IconButton } from './IconButton'

describe('<IconButton />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <IconButton className='h-10 w-10'>
        <CogIcon />
      </IconButton>
    )
    expect(baseElement).toBeTruthy()
  })
})
