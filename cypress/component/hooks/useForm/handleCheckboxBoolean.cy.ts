import { Type } from '@sinclair/typebox'

import { handleCheckboxBoolean } from '../../../../hooks/useForm/handleCheckboxBoolean'

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
    expect(result).deep.equal({
      myBoolean: true,
      myString: 'on'
    })
  })
})
