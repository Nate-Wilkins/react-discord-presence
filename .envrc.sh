#
# Run cleanup on ignored files.
#
function clean() {
  yarn clean
}

#
# Run NodeJS packages install with yarn.
#
function install() {
  yarn install
  yarn run yarn-deduplicate
}

#
# Run build pipeline to create distributable.
#
function build() {
  NODE_ENV=production yarn build
}

#
# Run documentation generation.
#
function docs() {
  yarn run docs
}

#
# Run source code linting.
#
# Dependencies:
# - [jikyuu](https://github.com/Ruin0x11/jikyuu): Estimates hours spent per Git author.
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
# Run storybook build.
#
function storybook_build() {
  yarn run storybook:build
}

#
# Run storybook screenshot capturer for storybook components.
#
function storybook_screenshot() {
  rm -rf "./__screenshots__/"
  STORYBOOK_PORT=5656 yarn run storycap http://localhost:5656 -i "**"
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
  echo '   install                Run NodeJS packages install with yarn.                        '
  echo '   build                  Run build pipeline to create distributable.                   '
  echo '   docs                   Run documentation generation.                                 '
  echo '   test                   Run tests.                                                    '
  echo '   lint                   Run source code linting.                                      '
  echo '   publish                Run publish pipeline for the distributable.                   '
  echo '   storybook              Run storybook.                                                '
  echo '   storybook_screenshot   Run storybook screenshot capturer for storybook components.   '
  echo '   storybook_build        Run storybook build.                                          '
  echo '   distributable_size     Run viewer to see distributable size.                         '
  echo '   help                   Run help.                                                     '
  echo '                                                                                        '
}
