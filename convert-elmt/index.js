const fs = require("fs-extra")
const Element = require("./Element")

async function main() {
  const element = await Element.fromFile("./data/cctv.elmt")
  // console.log(element)
  const svg = element.renderSVG()

  console.log(svg.svg())
  // await fs.writeFile("./output.svg", draw.svg(), { encoding: "utf-8" })
  // console.log(draw.svg())
}

main().catch(e => console.error(e))
