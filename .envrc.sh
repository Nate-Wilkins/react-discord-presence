#
# Run cleanup on temporary files.
#
function clean() {
  yarn clean
}

#
# Run build pipeline to create distributable.
#
function build() {
  yarn install
  NODE_ENV=production yarn build
}

#
# Run source code linting.
#
function lint() {
  yarn lint
}

#
# Run tests.
#
function test() {
  yarn test
}

#
# Run publish pipeline for the distributable.
#
function publish() {
  yarn publish $@
}

#
# Run storybook.
#
function storybook() {
  STORYBOOK_PORT=5656 yarn run storybook
}

#
# Run storybook screenshot capturer for storybook components.
#
function storybook_screenshot() {
  STORYBOOK_PORT=5656 yarn run storycap http://localhost:5656/ --puppeteerLaunchConfig '{ "headless": false,  "args": ["--sandbox"] }' --disableCssAnimation
}

#
# Run viewer to see distributable size.
#
function distributable_size() {
  dust "./dist"
}

#
# Run help.
#
function help() {
  echo '                                                                                        '
  echo 'Usage                                                                                   '
  echo '   clean                  Run cleanup on temporary files.                               '
  echo '   build                  Run build pipeline to create distributable.                   '
  echo '   lint                   Run source code linting.                                      '
  echo '   test                   Run tests.                                                    '
  echo '   publish                Run publish pipeline for the distributable.                   '
  echo '   storybook              Run storybook.                                                '
  echo '   storybook_screenshot   Run storybook screenshot capturer for storybook components.   '
  echo '   distributable_size     Run viewer to see distributable size.                         '
  echo '   help                   Run help.                                                     '
  echo '                                                                                        '
}
