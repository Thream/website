import { isStringWithOnlyOneEmoji } from "../../../../components/Emoji/isStringWithOnlyOneEmoji"

describe("components/Emoji/isStringWithOnlyOneEmoji", () => {
  it("returns true with a string with only one emoji", () => {
    expect(isStringWithOnlyOneEmoji(":wave:")).equal(true)
    expect(isStringWithOnlyOneEmoji(":smile:")).equal(true)
  })

  it("returns false with a string with multiple emoji or with text", () => {
    expect(isStringWithOnlyOneEmoji(":wave: :smile:")).equal(false)
    expect(isStringWithOnlyOneEmoji(":wave: some text")).equal(false)
    expect(isStringWithOnlyOneEmoji("some text :wave:")).equal(false)
  })

  it("returns false with a string without emoji", () => {
    expect(isStringWithOnlyOneEmoji("some text")).equal(false)
  })
})
