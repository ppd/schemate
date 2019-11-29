const hor = draw =>
  draw
    .pattern(6, 6, add => {
      add.line(0, 1, 6, 1).stroke({ width: 1, color: "black" })
    })
    .attr({ y: 4 })
    .id("fill-hor")

const ver = draw =>
  draw
    .pattern(8, 8, add => {
      add.line(1, 0, 1, 8).stroke({ width: 1, color: "black" })
    })
    .attr({ x: 4.5 })
    .id("fill-ver")

const bdiag = draw =>
  draw
    .pattern(8, 8, add => {
      add.line(0, 8, 8, 0).stroke({ width: 1, color: "black" })
      add.line(-1, 1, 1, -1).stroke({ width: 1, color: "black" })
      add.line(7, 9, 9, 7).stroke({ width: 1, color: "black" })
    })
    .id("fill-bdiag")

const fdiag = draw =>
  draw
    .pattern(8, 8, add => {
      add.line(0, 0, 8, 8).stroke({ width: 1, color: "black" })
      add.line(7, -1, 9, 1).stroke({ width: 1, color: "black" })
      add.line(-1, 7, 1, 9).stroke({ width: 1, color: "black" })
    })
    .id("fill-fdiag")

const patterns = {
  hor,
  ver,
  bdiag,
  fdiag
}

module.exports = patterns
