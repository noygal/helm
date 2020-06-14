helm lint charts/*
helm package charts/* -d docs
helm repo index --url https://noygal.github.io/helm/ --merge docs/index.yaml docs