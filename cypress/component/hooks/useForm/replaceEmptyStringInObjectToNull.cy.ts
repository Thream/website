import { replaceEmptyStringInObjectToNull } from '../../../../hooks/useForm/replaceEmptyStringInObjectToNull'

describe('hooks/useForm/replaceEmptyStringInObjectToNull', () => {
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
    ).deep.equal({
      foo: null,
      bar: 'bar',
      baz: ''
    })
  })
})
