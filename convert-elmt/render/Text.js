function parseFont(qetFontString) {
  const [family, size] = qetFontString.split(",")
  return {
    family,
    size: `${size}pt`
  }
}

class Text {
  constructor({ text, x, y, font, rotation }) {
    this.x = x
    this.y = y
    this.font = font
    this.rotation = rotation
    this.text = text
  }

  render(group) {
    const textElement = group
      .plain(this.text)
      .attr({ x: this.x, y: this.y })
      .font(parseFont(this.font))
    if (this.rotation !== 0) {
      textElement.rotate(this.rotation)
    }
    return textElement
  }
}

module.exports = Text
