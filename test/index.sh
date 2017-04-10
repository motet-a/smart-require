#!/bin/bash

set -ex
cd "$(dirname "$0")"

node ./from-root
node ./cannot-init-twice
