import { capitalize } from '../capitalize'

describe('tools/utils/capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toEqual('Hello')
    expect(capitalize('HeLlo')).toEqual('HeLlo')
    expect(capitalize('member(s)')).toEqual('Member(s)')
    expect(capitalize('Member(s)')).toEqual('Member(s)')
  })
})
