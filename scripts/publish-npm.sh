#!/usr/bin/env bash
set -e

BRANCH=`git rev-parse --abbrev-ref HEAD`

if [ "$BRANCH" != "master" ]; then
  echo "Error: Switch to the master branch before tagging."
  exit
fi

yarn build-npm
npm publish
echo 'Yay! Published a new package to npm.'
