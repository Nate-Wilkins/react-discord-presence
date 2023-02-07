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

function storybook() {
  STORYBOOK_PORT=5656 yarn run storybook
}

function storybook_screenshot() {
  STORYBOOK_PORT=5656 yarn run storycap http://localhost:5656/
}
