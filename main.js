'use strict'
process.env.PGURL = process.env.PGURL || 'postgres://localhost/pgtestcase'

const {Pool} = require('pg')
const QueryStream = require('pg-query-stream')
// TODO: install honeycomb
//
async function main() {
  const pool = new Pool({ connectionString: process.env.PGURL })
  let c = await pool.connect()
  console.log('dropping')
  await c.query(`DROP TABLE IF EXISTS frobnicators;`)
  console.log('creating')
  await c.query(`CREATE TABLE frobnicators (
    id serial primary key,
    updated timestamp
  )`)
  console.log('inserting')
  await c.query(`BEGIN;`)
  const query = new QueryStream(`INSERT INTO frobnicators ("updated") VALUES ($1) RETURNING "id"`, [Date.now()])
  query
    .on('data', console.log)
    .on('error', e => console.log({e}))
  await c.query(query, () => null) // useless callback necessitated by an older version of honeycomb-beeline

  await c.query(`ROLLBACK`)
  c.release()
  c = await pool.connect()
  await c.query(`BEGIN`)
  console.log('done')
  c.release()
  pool.end()
}

main().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
