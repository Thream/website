import { capitalize } from '../../../../tools/utils/capitalize'

describe('tools/utils/capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).equal('Hello')
    expect(capitalize('HeLlo')).equal('HeLlo')
    expect(capitalize('member(s)')).equal('Member(s)')
    expect(capitalize('Member(s)')).equal('Member(s)')
  })
})
