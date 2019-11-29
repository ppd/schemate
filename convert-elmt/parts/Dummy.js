class Dummy {
  constructor(data) {
    this.data = data
  }

  renderSVG() {
    console.log(`NOT IMPLEMENTED: ${this.data["#name"]}`)
  }
}

module.exports = Dummy
