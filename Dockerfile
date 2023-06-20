FROM docker.io/library/ruby:2.7.4-slim
RUN apt-get update \
  && apt-get --assume-yes install 'build-essential' 'locales'

WORKDIR /site

COPY Gemfile Gemfile

RUN NOKOGIRI_USE_SYSTEM_LIBRARIES=true bundle install

RUN echo 'en_US.UTF-8 UTF-8' > '/etc/locale.gen' && locale-gen
ENV LANG en_US.UTF-8

COPY _gists _gists
COPY _layouts _layouts
COPY _posts _posts
COPY assets assets
COPY _config.yaml about.html gists.html index.html posts.html .

ENTRYPOINT ["jekyll"]
