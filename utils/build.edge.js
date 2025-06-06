var path = require("path")
var fs = require("fs")

const buildEnvFile = path.join(__dirname, "..", "src/utils/generate/builderEnv.temp.js")

const content = `
  export const getPackageChannel = () => {
    return "edge"
  }
  `

fs.writeFileSync(buildEnvFile, content)

const build = require("./build.base")
build("edge")
