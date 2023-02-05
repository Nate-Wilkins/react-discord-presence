function build() {
  yarn install
  NODE_ENV=production yarn build
}

function lint() {
  yarn lint
}

function start() {
  yarn install
  yarn start
}

function publish() {
  yarn publish $@
}
