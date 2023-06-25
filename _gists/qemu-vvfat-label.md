---
title: Customize fat label with qemu virtual fat driver
---

```sh
  -blockdev driver=vvfat,node-name=cidata,read-only=on,dir="$cidata_dir",label='CIDATA' \
  -device virtio-blk-pci,drive=cidata \
```
