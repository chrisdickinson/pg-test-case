# pg-test-case

A failing reproduction of https://github.com/brianc/node-postgres/issues/1872.

Run `npm install; npm start` to witness the bug. Requires docker to run postgres (to pin the postgres version.)
Runs a local OSX copy of Node vendored into the repo (v12.18.4.) Error observed on Node v14.9.0 as well.

# error output

```
dropping
creating
inserting
{
  e: error: date/time field value out of range: "1605732185247"
      at Parser.parseErrorMessage (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/parser.js:278:15)
      at Parser.handlePacket (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/parser.js:126:29)
      at Parser.parse (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/parser.js:39:38)
      at Socket.<anonymous> (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/index.js:10:42)
      at Socket.emit (events.js:315:20)
      at addChunk (_stream_readable.js:295:12)
      at readableAddChunk (_stream_readable.js:271:9)
      at Socket.Readable.push (_stream_readable.js:212:10)
      at TCP.onStreamRead (internal/stream_base_commons.js:186:23) {
    length: 168,
    severity: 'ERROR',
    code: '22008',
    detail: undefined,
    hint: 'Perhaps you need a different "datestyle" setting.',
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: undefined,
    table: undefined,
    column: undefined,
    dataType: undefined,
    constraint: undefined,
    file: 'datetime.c',
    line: '3781',
    routine: 'DateTimeParseError'
  }
}
done
/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg/lib/client.js:360
    this.activeQuery.handleCommandComplete(msg, this.connection)
                     ^

TypeError: Cannot read property 'handleCommandComplete' of null
    at Client._handleCommandComplete (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg/lib/client.js:360:22)
    at Connection.emit (events.js:315:20)
    at /Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg/lib/connection.js:115:12
    at Parser.parse (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/parser.js:40:17)
    at Socket.<anonymous> (/Users/wow-a-username/projects/personal/pg-test-case/node_modules/pg-protocol/dist/index.js:10:42)
    at Socket.emit (events.js:315:20)
    at addChunk (_stream_readable.js:295:12)
    at readableAddChunk (_stream_readable.js:271:9)
    at Socket.Readable.push (_stream_readable.js:212:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:186:23)
```

# license

MIT (feel free to use this in your projects if you would like to crash them)
