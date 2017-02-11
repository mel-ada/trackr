require( 'dotenv' ).config()
const fetch = require( 'node-fetch' )

const { School } = require( '../index' )

const DATA_URL = 'https://data.oaklandnet.com/resource/d6pc-iyaw.json'

const humanAddressToAddress = address =>
  `${address.address}, ${address.city}, ${address.state} ${address.zip}`

const entryToObject = entry => {
  console.log( "Processing ", entry.school )

  return {
    lat: entry.address.latitude,
    long: entry.address.longitude,
    address: humanAddressToAddress( JSON.parse( entry.address.human_address )),
    school: entry.school,
    phone: entry.phone,
    type: entry.type
  }
}

const insertSchoolSeedData = json =>
  Promise.all(
    json.map( entry => School.create( entryToObject( entry )) )
  )

fetch( DATA_URL, { method: 'GET', mode: 'cors', })
  .then( result => result.json() )
  .then( insertSchoolSeedData )
  .catch( error => console.log( error ) )
  .then( _ => process.exit() )
