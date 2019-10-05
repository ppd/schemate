function text(group, text) {
  const textElement = group
    .plain(text)
    .attr({ x, y })
    .font(parseFont(font))
  if (rotation !== 0) {
    textElement.rotate(rotation)
  }
  return textElement
}

module.exports = text
