import { Type } from '@sinclair/typebox'

import { handleCheckboxBoolean } from './handleCheckboxBoolean'

const schema = Type.Object({
  myBoolean: Type.Boolean(),
  myString: Type.String()
})

describe('hooks/useForm/handleCheckboxBoolean', () => {
  it('should convert all checkbox property to boolean', () => {
    const object = {
      myBoolean: 'on',
      myString: 'on'
    }
    const result = handleCheckboxBoolean(object, schema)
    expect(result).toEqual({
      myBoolean: true,
      myString: 'on'
    })
  })
})
