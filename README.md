# vbezhenar.github.io

```
NOKOGIRI_USE_SYSTEM_LIBRARIES=true bundle install --path .bundle
bundle exec jekyll serve --livereload
```

```
docker build . && docker run --rm -p 127.0.0.1:35729:35729 -p 127.0.0.1:4000:4000 -v ./assets:/site/assets $(docker build -q .) serve --livereload --host=0.0.0.0
```
