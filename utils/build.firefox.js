// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production"
process.env.NODE_ENV = "production"
process.env.ASSET_PATH = "/"

var webpack = require("webpack"),
  path = require("path"),
  fs = require("fs"),
  config = require("../webpack.config"),
  ZipPlugin = require("zip-webpack-plugin"),
  FirefoxPlugin = require("./FirefoxPlugin")

delete config.chromeExtensionBoilerplate

config.mode = "production"

var packageInfo = JSON.parse(fs.readFileSync("package.json", "utf-8"))

config.plugins = (config.plugins || []).concat(
  new FirefoxPlugin({
    version: packageInfo.version,
    file: path.join(__dirname, "../", "src", "manifest.firefox.json")
  }),
  new ZipPlugin({
    filename: `${packageInfo.name}-${packageInfo.version}.zip`,
    path: path.join(__dirname, "../", "zip")
  })
)

webpack(config, function (err, stats) {
  if (err || stats.hasErrors()) {
    console.error(err || stats.compilation.errors)
    throw new Error("webpack: Failed to build", err || stats.compilation.errors)
  }
})
