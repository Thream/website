import { replaceEmptyStringInObjectToNull } from './replaceEmptyStringInObjectToNull'

describe('tools/utils/replaceEmptyStringInObjectToNull', () => {
  it('should replace empty string in object to null except for required properties', () => {
    expect(
      replaceEmptyStringInObjectToNull(
        {
          foo: '',
          bar: 'bar',
          baz: ''
        },
        ['baz']
      )
    ).toEqual({
      foo: null,
      bar: 'bar',
      baz: ''
    })
  })
})
