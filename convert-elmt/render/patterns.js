const horPattern = draw
  .pattern(6, 6, add => {
    add.line(0, 1, 6, 1).stroke({ width: 1, color: "black" })
  })
  .attr({ y: 4 })

const verPattern = draw
  .pattern(8, 8, add => {
    add.line(1, 0, 1, 8).stroke({ width: 1, color: "black" })
  })
  .attr({ x: 4.5 })

const bdiagPattern = draw.pattern(8, 8, add => {
  add.line(0, 8, 8, 0).stroke({ width: 1, color: "black" })
  add.line(-1, 1, 1, -1).stroke({ width: 1, color: "black" })
  add.line(7, 9, 9, 7).stroke({ width: 1, color: "black" })
})

const fdiagPattern = draw.pattern(8, 8, add => {
  add.line(0, 0, 8, 8).stroke({ width: 1, color: "black" })
  add.line(7, -1, 9, 1).stroke({ width: 1, color: "black" })
  add.line(-1, 7, 1, 9).stroke({ width: 1, color: "black" })
})

const patterns = {
  hor: horPattern,
  ver: verPattern,
  bdiag: bdiagPattern,
  fdiag: fdiagPattern
}

module.exports = patterns
