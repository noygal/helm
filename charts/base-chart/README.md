# `base-chart` - helm chart (v3)

## Motivation

The aim and goal of this [helm](https://helm.sh/) chart is to provide a base/dependency chart for deploying multiple containers/services/ingresses with a single chart. This chart is mainly oriented for small home networks with a [k3s](https://k3s.io/) distribution and none dynamic [NFS](https://en.wikipedia.org/wiki/Network_File_System) volume mounts, and it is born from my personal need/desire to migrate my current `docker-compose` based deployment to to kubernetes.

```bash
helm install -f my-values.yaml base-chart
```

You can check out an example [here](https://github.com/noygal/helm/charts/exmple-dev-tools).

## API (values)

**Highlights**:

1. Multiple containers declarations for pod deployment.
2. Sharing values between containers, such as `imagePullPolicy`.
3. Merging the containers `env` (environment variables) values with a shared `env` values, useful for sharing such thing like linux group and user id between containers.
4. Multiple ingresses, allows dedicated ingress rules/annotations per ingress.
5. Multiple rules decelerations per ingress, allow mounting multiple services on a single ingress.
6. Multiple service port decelerations.

NOTE: If there a use case for multiple services please open a feature request.

### Pod - containers

Value | Type | Description
--- | --- | ---
`pod.volumes` | `array` | *optional*, the volumes we want to mount on the pod, [docs](https://kubernetes.io/docs/concepts/storage/volumes/)
`pod.containers` | `array` | the containers to run on the pod, [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#container-v1-core)
`pod.sharedEnv` | `array` | *optional*, those values would be added to to the `env` values of every container, use cases: user/group id, timezone, etc'
`pod.sharedValues` | `object` | *optional*, those values would be added to every container, use cases: `imagePullPolicy`, `securityContext`, etc'
`pod.initContainers` | `array` | *optional*, the `initContainers` to run on the pod, do not use `sharedEnv` or `sharedValues`, [docs](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)

### Ingresses

Value | Type | Description
--- | --- | ---
`ingresses` | `array` | the ingresses decelerations array, an ingress would be created per item
`ingresses[].name` | `string` | the ingress name
`ingresses[].disabled` | `boolean` | *optional*, set to `true` to disable the ingress
`ingresses[].annotations` | `object` | the ingress annotation, [docs](https://kubernetes.io/docs/concepts/services-networking/ingress/#the-ingress-resource)
`ingresses[].rules` | `array` | rules array, multiple rules can be set per ingress, [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#ingressrule-v1beta1-extensions)
`ingresses[].rules[].path` | `string` | the path to mount the service
`ingresses[].rules[].serviceName` | `string` | the service name, MUST much the name on the `service.ports[]` declaration
`ingresses[].rules[].servicePort` | `integer` | the service port, MUST much the name on the `service.ports[]` declaration
`ingresses[].rules[].host` | `string` | the host name, should be configured externally (hosts file, DNS server, etc' ) example: `domain.net`

### Service

Value | Type | Description
--- | --- | ---
`service` | `object` | the service decelerations
`service.type` | `string` | service type - [docs](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)
`service.ports` | `array` | every item map to a service port, [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#serviceport-v1-core)
`service.ports[].port` | `integer` | the service port, should be exposed on the container
`service.ports[].targetPort` | `integer` | the exposed port
`service.ports[].name` | `array` | the service port name

### Pod - general settings

Value | Type | Description
--- | --- | ---
`pod` | `object` | the pod decelerations
`pod.replicas` | `integer` | *optional*, the replicas number we want for the pod, default: 1
`pod.minReadySeconds` | `integer` | *optional*, pod definition - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#deploymentspec-v1-apps)
`pod.progressDeadlineSeconds` | `integer` | *optional*, pod definition - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#deploymentspec-v1-apps)
`pod.revisionHistoryLimit` | `integer` | *optional*, pod definition - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#deploymentspec-v1-apps)

### Pod template specs

The pod templates specs values, follow the default `helm` template chart behavior.

Value | Type | Description
--- | --- | ---
`pod.imagePullSecrets` | `array` | *optional*, pod.template.spec.imagePullSecrets - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podtemplatespec-v1-core)
`pod.podSecurityContext` | `object` | *optional*, pod.template.spec.podSecurityContext - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podtemplatespec-v1-core)
`pod.nodeSelector` | `object` | *optional*, pod.template.spec.nodeSelector - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podtemplatespec-v1-core)
`pod.tolerations` | `array` | *optional*, pod.template.spec.tolerations - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podtemplatespec-v1-core)
`pod.affinity` | `object` | *optional*, pod.template.spec.affinity - [docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podtemplatespec-v1-core)

### Helm chart

Featured preserved from `helm` default template.

Value | Type | Description
--- | --- | ---
`nameOverride` | `string` | helm default `nameOverride` behavior
`fullnameOverride` | `string` | helm default `fullnameOverride` behavior
`serviceAccount` | `object` | helm default `serviceAccount` behavior
