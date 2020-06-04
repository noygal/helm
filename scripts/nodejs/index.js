const path = require('path')
const fs = require('fs-extra')
const config = require('./config')
const { getImageDocsFiles } = require('./src/git')
const { mapFile } = require('./src/files')
const processor = require('./src/processor')
const logger = console

fs.ensureDir(config.workingFolder)
fs.ensureDir(config.outputFolder)

const cleanup = () => fs.remove(config.workingFolder)

const logWrap = logFun => (...props) => {
  logFun(...props)
  return props[0]
} 

const getFirstLine = file => file.content.split('\n')[0]

const preprocessFiles = files =>
  files
    .map(logWrap((file, i) => logger.log(`${i} - Found file: ${file.fileName}`)))
    // Filtering only valid files
    .filter(file => config.files.firstLineRegexFilter.test(getFirstLine(file)))
    // Main mapper
    .map(mapFile(config))
    // Filter data without description ('tester' file use case)
    .filter(data => data.description)
    .map(logWrap((data, i) => logger.log(`${i} - Data populates from file: ${data.fileName}, name: ${data.name}`)))


const processData = data => 
  Promise.all(
    data
      .map(async ({ name, fileName, fullPath, description, ports, env, volumes, devices, arch, dockerCompose }) => {
        await fs.ensureDir(path.join(config.outputFolder, name))
        const docker = processor.processDockerCompose(dockerCompose)

        const values = processor.generateValues(config)({ name, ports, docker })
        const chart = processor.generateChart(config)({ name })
        const readme = processor.generateReadme(config)({ name, description })
        await fs.writeFile(path.join(config.outputFolder, name, 'values.yaml'), values.output)
        await fs.writeFile(path.join(config.outputFolder, name, 'Chart.yaml'), chart.output)
        await fs.writeFile(path.join(config.outputFolder, name, 'README.md'), readme.output)
      })
  )

getImageDocsFiles(config)
  .then(preprocessFiles)
  .then(processData)
  // .then(results => console.log(require('util').inspect(results.find(el => !el.dockerCompose), {showHidden: false, depth: null})))
  // .then(results => console.log(require('util').inspect(results[85], {showHidden: false, depth: null})))
  // .then(results => Promise.all(results.map(({name, output}))))
  .catch(console.error)
  .then(cleanup)

