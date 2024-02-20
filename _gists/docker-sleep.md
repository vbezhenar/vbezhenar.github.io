---
title: docker cmd for sleep responding to signals
---

```sh
docker run --rm -it alpine:3 sh -c 'trap true TERM; sleep 1 & while wait $!; do sleep 1 & done'
```
