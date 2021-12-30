import { isStringWithOnlyOneEmoji } from './isStringWithOnlyOneEmoji'

describe('components/Emoji/isStringWithOnlyOneEmoji', () => {
  it('returns true with a string with only one emoji', () => {
    expect(isStringWithOnlyOneEmoji(':wave:')).toBeTruthy()
    expect(isStringWithOnlyOneEmoji(':smile:')).toBeTruthy()
  })

  it('returns false with a string with multiple emoji or with text', () => {
    expect(isStringWithOnlyOneEmoji(':wave: :smile:')).toBeFalsy()
    expect(isStringWithOnlyOneEmoji(':wave: some text')).toBeFalsy()
    expect(isStringWithOnlyOneEmoji('some text :wave:')).toBeFalsy()
  })

  it('returns false with a string without emoji', () => {
    expect(isStringWithOnlyOneEmoji('some text')).toBeFalsy()
  })
})
