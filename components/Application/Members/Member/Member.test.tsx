import { render } from '@testing-library/react'

import { Member } from './Member'
import { memberExampleComplete } from '../../../../cypress/fixtures/members/member'

describe('<Member />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Member member={memberExampleComplete} />)
    expect(baseElement).toBeTruthy()
  })
})
