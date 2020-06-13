# `example-dev-tools` - helm chart (v3)

The current [`values.yaml`](https://github.com/noygal/helm/blob/master/charts/exmple-dev-tools/values.yaml) includes some good examples for deployment use cases:

1. [cloud9](https://aws.amazon.com/cloud9/) - exposed as service and ingress.

2. [mariadb](https://mariadb.org/) - not exposed, to be use internally by other containers.

3. [codimd](https://github.com/hackmdio/codimd) - uses `mariadb` container, exposed as service and ingress.

Please notice that this chart would NOT deploy with those values unless you have the exact same setup as my home network (which is highly unlikely), please provide a full `value.yaml` if you want to use this chart.


```bash
helm install -f my-values.yaml example-dev-tools
```

For the full chart API please refer to the [base-chart](https://github.com/noygal/helm/tree/master/charts/base-chart).
