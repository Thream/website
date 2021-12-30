export const emojiRegex = /:\+1:|:-1:|:[\w-]+:/

export const isStringWithOnlyOneEmoji = (value: string): boolean => {
  const result = emojiRegex.exec(value)
  return result != null && result.input === result[0]
}
