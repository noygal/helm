const splitMdTableLine = line =>
  line
    // Slipping cells
    .split('|')
    // remove '`' char and trim
    .map(el => el.replace(/`/g, '').trim())
    // remove empty values
    .filter(el => el)
    // parsing integer
    // .map(el => parseInt(el) || parseInt(el) === 0 ? parseInt(el) : el )
    // // parsing boolean - true
    // .map(el => el === 'true' ? true : el )
    // // parsing boolean - false
    // .map(el => el === 'false' ? false : el )

const mapFile = config => ({ fileName, fullPath, content }) => {
  const lines = content.split('\n')
  const name = lines[0].split('/')[1].split(']')[0]
  const description = lines.find(line => 
    // Find a line with the project name link - 'descriptionsMap' override
    line.toLowerCase().includes(`[${config.files.descriptionsMap[name] || name}]`)
  )
  // Assume a single table per block
  const mapTableByHeader = blockStart => {
    // Finding the block by name
    const startIndex = lines.findIndex(line => line.startsWith(blockStart))
    // Could not find block
    if (startIndex === -1) return null
    const endIndex = lines.findIndex((line, i) => i > startIndex && (line.startsWith('###') || line.startsWith('####')))
    const block = lines.slice(startIndex, endIndex)
    // Getting the dataset from the block - assuming a single table per block
    const dataSet = block.reduce((acc, curr) => {
      // Not a table
      if (!curr.startsWith('|')) return acc
      // No content, just the align section
      if (curr.includes('---')) return acc
      // If no headers, we've at the first line
      if (acc.headers.length === 0) acc.headers = splitMdTableLine(curr)
      // Now we're at a data line
      else acc.data.push(splitMdTableLine(curr))
      return acc
    }, { headers: [], data: [] })
    return { startIndex, endIndex, dataSet }
  }
  // Assume only one yaml block on the file
  const yamlMatch = /```yaml[\s\S]*?services:\s(?<content>[\s\S]*?)```/g.exec(content)

  return {
    name, fileName, fullPath, description, 
    ports: mapTableByHeader('### Ports'),
    env: mapTableByHeader('### Environment Variables'),
    volumes: mapTableByHeader('### Volume Mappings'),
    devices: mapTableByHeader('#### Device Mappings'),
    arch: mapTableByHeader('## Supported Architectures'),
    dockerCompose: yamlMatch ? yamlMatch.groups.content : null
  }
}

module.exports = { mapFile }
