#
# Run cleanup on ignored files.
#
function clean() {
  yarn clean
}

#
# Run configuration setup for a specific environment.
#
function configure() {
  if [[ "$1" == "--env" ]]; then
    case "$2" in
     release) PROJ_ENV=release    ;;
     *)       PROJ_ENV=develop    ;;
    esac
  else
    PROJ_ENV=develop
  fi

  echo "Setting environment to '$PROJ_ENV'."
  export $PROJ_ENV

  # release
  if [[ "$PROJ_ENV" == "release" ]]; then
    export STORYBOOK_PORT=5656
    export NODE_ENV="production"
  fi

  # develop
  if [[ "$PROJ_ENV" == "develop" ]]; then
    export STORYBOOK_PORT=5656
    export NODE_ENV="development"
  fi
}

#
# Run a check with the current environment to see if it matches the provided environment.
#
function check() {
  if [[ "$1" != "--env" ]]; then
    echo "To check envs run with '--env develop,release'"
    (exit 2)
  else
    if [[ ",$2," != *",$PROJ_ENV,"* ]]; then
      echo "Command only available for '$2' environments."
      (exit 1)
    else
      (exit 0)
    fi
  fi
}

#
# Reset the current environment to development.
#
function reset() {
  unset PROJ_ENV

  unset STORYBOOK_PORT
  unset NODE_ENV
}

#
# Run NodeJS packages install with yarn.
#
function install() {
  check --env develop
  if [[ $? -eq 0 ]]; then
    yarn install
    yarn run yarn-deduplicate
  fi
}

#
# Run build pipeline to create distributable.
#
function build() {
  yarn build
}

#
# Run documentation generation.
#
# Dependencies:
# - [jikyuu](https://github.com/Ruin0x11/jikyuu): Estimates hours spent per Git author.
#
function docs() {
  yarn run docs
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
  check --env develop
  if [[ $? -eq 0 ]]; then
    yarn test
  fi
}

#
# Run publish pipeline for the distributable.
#
function publish() {
  check --env release
  if [[ $? -eq 0 ]]; then
    yarn publish $@
  fi
}

#
# Run storybook.
#
function storybook() {
  check --env develop
  if [[ $? -eq 0 ]]; then
    yarn run storybook
  fi
}

#
# Run storybook build.
#
function storybook_build() {
  check --env develop
  if [[ $? -eq 0 ]]; then
    yarn run storybook:build
  fi
}

#
# Run storybook screenshot capturer for storybook components.
#
function storybook_screenshot() {
  check --env develop
  if [[ $? -eq 0 ]]; then
    rm -rf "./__screenshots__/"
    yarn run storycap http://localhost:$STORYBOOK_PORT -i "Examples/**" -i "Display/DiscordPresence/**" -i "Display/LoadingDiscordPresence/**" -i "Display/ErrorDiscordPresence/**" --captureTimeout 30000
  fi
}

#
# Run viewer to see distributable size.
#
function distributable_size() {
  check --env release
  if [[ $? -eq 0 ]]; then
    dust "./dist"
  fi
}

#
# Run help.
#
function help() {
  echo '                                                                                          '
  echo 'Usage                                                                                     '
  echo '   clean                  Run cleanup on temporary files.                                 '
  echo '   configure              Run configuration setup for a specific environment.             '
  echo '   install                Run NodeJS packages install with yarn.                          '
  echo '   build                  Run build pipeline to create distributable.                     '
  echo '   docs                   Run documentation generation.                                   '
  echo '   test                   Run tests.                                                      '
  echo '   lint                   Run source code linting.                                        '
  echo '   publish                Run publish pipeline for the distributable.                     '
  echo '   storybook              Run storybook.                                                  '
  echo '   storybook_screenshot   Run storybook screenshot capturer for storybook components.     '
  echo '   storybook_build        Run storybook build.                                            '
  echo '   distributable_size     Run viewer to see distributable size.                           '
  echo '   reset                  Reset the current environment to development.                   '
  echo '   check                  Run check against the current environment to see if it matches. '
  echo '   help                   Run help.                                                       '
  echo '                                                                                          '
}

# Configure the default environment.
configure --env develop
