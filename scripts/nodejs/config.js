const path = require('path')
const workingFolder = path.join(__dirname, '.temp')

module.exports = {
  // The temporary working folder
  workingFolder,
  // The output folder for the charts
  outputFolder: path.join(__dirname, '../../gen'),
  // The helm chart repository
  repository: 'https://noygal.github.com/helm',
  // Git related settings
  git: {
    repository: 'https://github.com/linuxserver/docker-documentation',
    imagesFolder: path.join(workingFolder, 'docker-documentation', 'images')
  },
  files: {
    // The files are filtered by the first line of the file, the current regex filtering
    // only valid readme files (the other are internal or deprecated).
    // We can use this regex to filter only specific files (cloud9 and code-server), like so:
    // firstLineRegexFilter: /^# \[linuxserver\/(cloud9|code-server)\]\(https:\/\/github\.com\/linuxserver\/.+\)$/,
    firstLineRegexFilter: /^# \[linuxserver\/.+\]\(https:\/\/github\.com\/linuxserver\/.+\)$/,
    descriptionsMap: {
      doublecommander: 'double commander',
      foldingathome: 'folding@home',
      'mysql-workbench': 'mysql workbench',
      wireguard: 'wireguard®'
    }
  },
  versions: {
    chartVersion: '0.1.2',
    appVersion: '0.1.1',
    baseChartVersion: '0.1.1',
  },
  chart: {
    host: 'k3s',
    defaultVolumes: [{
      name: 'appdata',
      nfs: {
        server: '192.168.1.10',
        path: '/appdata'
      }
    }],
    defaultEnv: [{
        name: 'GUID',
        value: '1000'
      }, {
        name: 'PUID',
        value: '1000'
      }, {
        name: 'TZ',
        value: 'Asia/Jerusalem'
    }],
    defaultValues: {
      imagePullPolicy: 'IfNotPresent'
    },
    overrides: {
      env: {
        bookstack: {
          DB_HOST: 'localhost'
        },
        codimd: {
          DB_HOST: 'localhost'
        },
        diskover: {
          REDIS_HOST: 'localhost',
          ES_HOST: 'localhost'
        },
        'snipe-it': {
          MYSQL_PORT_3306_TCP_ADDR: 'localhost'
        },
      }
    }
  }
}