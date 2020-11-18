# pg-test-case

A failing reproduction of https://github.com/brianc/node-postgres/issues/1872.

Run `npm install; npm start` to witness the bug. Requires docker to run postgres (to pin the postgres version.)
Runs a local OSX copy of Node vendored into the repo (v12.18.4.) Error observed on Node v14.9.0 as well.

# license

MIT (feel free to use this in your projects if you would like to crash them)
