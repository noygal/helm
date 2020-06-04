const fs = require('fs-extra')
const path = require('path')
const git = require('simple-git/promise')

const getImageDocsFiles = config =>
  git(config.workingFolder)
    .clone(config.git.repository)
    .then(() => fs.readdir(config.git.imagesFolder))
    .then(async filesNames => {
        const fullPaths = filesNames.map(fileName => path.join(config.git.imagesFolder, fileName))
        const contents = await Promise.all(fullPaths.map(filePath => fs.readFile(filePath, 'utf-8')))
        return filesNames.map((fileName, i) => ({ fileName, fullPath: fullPaths[i], content: contents[i] }))
    })

module.exports = { getImageDocsFiles }