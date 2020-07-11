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

## Project Structure

### `charts` folder

Contains the [base chart](https://noygal.github.com/helm/charts/base-chart) for all the generated charts, also an usage [example](https://noygal.github.com/helm/charts/example-dev-tools).

### `scripts` folder

Contains various maintenance scripts and the [Node.JS script](https://noygal.github.com/helm/scripts/nodejs) that generate the linuxserver.io charts.

### `gen` folder

Contains the latest generated charts.

### `docs` folder

This folder is structured as helm registry and served by [GitHub Pages](https://pages.github.com/) allowing an easy serving of the registry, a setup guide can be found [here](https://medium.com/@mattiaperi/create-a-public-helm-chart-repository-with-github-pages-49b180dbb417).

## Caveats

All the charts are automatically generate and most of them are not tested at this stage, the ones that are tested running on a `RPi4 (arm64)` in `k3s` and NFS mounted volumes on the pods, this is not a production ready recipe to say the least...

## Roadmap

- Support for versions, following the linuxserver.io versions.
- CI/CD (github actions)
  - linuxserver.io docs site triggers
  - testing charts (k3s in docker)
  - registry validation
