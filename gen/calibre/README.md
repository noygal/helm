# Helm chart (V3) - calibre

## calibre

[Calibre](https://calibre-ebook.com/) is a powerful and easy to use e-book manager. Users say it’s outstanding and a must-have. It’ll allow you to do nearly everything and it takes things a step beyond normal e-book software. It’s also completely free and open source and great for both casual users and computer experts.

The the docker image is part of the the [`linuxserver.io`](https://www.linuxserver.io/) collection, it has a great [documentation](https://github.com/linuxserver/docker-calibre) that cover all the image features.

## About

This chart was created with [Node.JS script](https://noygal.github.com/helm/scripts/nodejs), and relay on [`base-chart`](https://noygal.github.com/helm/base-chart) dependency for templates functionally - allowing the use of highly flexible single `value.yaml` file for describing the chart. Please refer to `base-chart` documentation for a full API description. The script scrape the [docker-documentation](https://github.com/linuxserver/docker-documentation) repository, that contains the documentation for all the `linuxserver.io` images.

The the default values for the script are set to my local network configuration - [`k3s`](https://k3s.io/) cluster on raspberry pi 4 and NFS server on `192.168.1.10`, you can use the script [configuration](https://noygal.github.com/helm/scripts/nodejs/config.js) to generate charts that fit your configuration.


## Usage

### Helm install

```bash
helm install calibre calibre
```

### Caveats

Don't expect everything to work out of the box!
