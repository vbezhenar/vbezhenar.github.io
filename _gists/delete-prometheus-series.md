---
title: Delete prometheus series
---

```sh
curl -g -i -X POST 'https://prometheus.cmctech.pro/api/v1/admin/tsdb/delete_series?match[]=container_memory_working_set_bytes:max_by_pod_base_name{namespace="loki",pod_base_name="loki"}&end=2024-05-09T20:00:00Z'
```
