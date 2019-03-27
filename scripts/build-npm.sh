#!/usr/bin/env bash
set -e

rimraf dist/
yarn
yarn build
rollup -c
echo "Stored standalone library at dist/fetch_wechat(.min).js"
npm pack
