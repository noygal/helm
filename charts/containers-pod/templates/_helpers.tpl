{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "containers-pod.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "containers-pod.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "containers-pod.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "containers-pod.labels" -}}
helm.sh/chart: {{ include "containers-pod.chart" . }}
{{ include "containers-pod.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "containers-pod.selectorLabels" -}}
app.kubernetes.io/name: {{ include "containers-pod.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "containers-pod.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
  {{ default (include "containers-pod.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
  {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{/*
Map a contanier values to a container template
Reference: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core
*/}}
{{ define "mapper.containers" }}
{{- $common := .Values.pod.common }}
{{- $commonEnv := .Values.pod.commonEnv | default list }}
containers:
{{- range .Values.pod.containers -}}
  {{- $container := (merge . $common) }}
  {{- $env := concat $commonEnv (.env | default list) | default list }}
  {{- $_ := unset $container "env" }}
  - env:
{{ toYaml $env | indent 4 }}
{{ toYaml $container | indent 4}}
{{- end }}
{{- if .Values.pod.initContainers }}
{{- range .Values.pod.initContainers }}
initContainers:
  {{- $container := merge . $common }}
  {{- $env := concat $commonEnv (.env | default list) | default list }}
  {{- $_ := unset $container "env" }}
  - env:
{{ toYaml $env | indent 4 }}
{{ toYaml $container | indent 4 }}
{{- end }}
{{- end }}
{{ end }}
