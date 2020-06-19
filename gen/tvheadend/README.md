# Helm chart (V3) - tvheadend

## tvheadend

[Tvheadend](https://www.tvheadend.org/) works as a proxy server: is a TV streaming server and recorder for Linux, FreeBSD and Android supporting DVB-S, DVB-S2, DVB-C, DVB-T, ATSC, ISDB-T, IPTV, SAT>IP and HDHomeRun as input sources.

The the docker image is part of the the [`linuxserver.io`](https://www.linuxserver.io/) collection, it has a great [documentation](https://github.com/linuxserver/docker-tvheadend) that cover all the image features.

## About

This chart was created with [Node.JS script](https://noygal.github.com/helm/scripts/nodejs), and relay on [`base-chart`](https://noygal.github.com/helm/base-chart) dependency for templates functionally - allowing the use of highly flexible single `value.yaml` file for describing the chart. Please refer to `base-chart` documentation for a full API description. The script scrape the [docker-documentation](https://github.com/linuxserver/docker-documentation) repository, that contains the documentation for all the `linuxserver.io` images.

The the default values for the script are set to my local network configuration - [`k3s`](https://k3s.io/) cluster on raspberry pi 4 and NFS server on `192.168.1.10`, you can use the script [configuration](https://noygal.github.com/helm/scripts/nodejs/config.js) to generate charts that fit your configuration.


## Usage

### Helm install

```bash
helm install tvheadend tvheadend
```

### Caveats

Don't expect everything to work out of the box!
