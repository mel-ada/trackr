const fs = require( 'fs' )

if( fs.statSync( './.env' )) {
  require( 'dotenv' ).config()
}

const express = require('express')
const bodyParser = require( 'body-parser' )
const app = express()
const morgan = require( 'morgan' )

const { Crime, School } = require( './db' )

const publish = require( './pubnub' )

app.use( bodyParser.json() )

app.use( (request, response, next) => {
  response.header( 'Access-Control-Allow-Origin', '*' )
  response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
  next()
})

app.get( '/', (request, response) => {
  publish({ timestamp: Date.now() })
  response.send('Hello World!')
})

app.get( '/crimes', (request, response) => {
  Crime.all()
    .then( result => response.json( result ))
})

app.post( '/crimes', (request, response) => {
  Crime.create( request.body )
    .then( result => publish( result[ 0 ], 'crimes' ) )
    .then( _ => response.status( 204 ).json({}))
    .catch( error => response.status( 422 ).json( error ))
})

app.get( '/schools', (request, response) => {
  School.all()
    .then( result => response.json( result ))
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!')
})
