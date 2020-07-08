# helm chart repository (v3)

This repository is a helm charts registry containing most of the [linuxserver.io](https://www.linuxserver.io/) community based docker images as helm chart. The `linuxserver.io` project is a very mature and well maintained, the standard documentation allow us to general all the charts automatically from a single repository - [docker-documentation](https://github.com/linuxserver/docker-documentation). This project is the result of my personal experience with converting my small home network from `docker-compose` based solution to `k8s`.

## Usage

### 1. Install

Adding registry to helm (single time):

```bash
helm repo add noygal https://noygal.github.io/helm
```

Search registry:

```bash
helm search repo noygal
```

Install chart:

```bash
helm install cloud9 noygal/cloud9
```

### 2. Clone

All the charts code generation is located under `script/nodejs`, it should be pretty straight forward to change the templates and configuration to produce personal version of this repository with defaults set to your personal setup.
