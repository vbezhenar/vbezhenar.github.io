---
title: Using aws cli for S3 inside docker
---

```sh
read AWS_ACCESS_KEY_ID
read AWS_SECRET_ACCESS_KEY
docker run --rm \
  -e 'AWS_ACCESS_KEY_ID' -e 'AWS_SECRET_ACCESS_KEY' \
  -v "$PWD:/aws" \
  'docker.io/amazon/aws-cli:latest' \
  --endpoint-url='https://archive.pscloud.io' \
  --region='kz-ala-1' \
  s3 cp './local-file' 's3://bucket/key/name'
```
