require( 'dotenv' ).config()
const fetch = require( 'node-fetch' )

const { Crime } = require( '../index' )

const DATA_URL = 'http://oakland.crimespotting.org/crime-data?format=json&dstart=2013-01-01&dend=2013-12-31&count=150'

const entryToObject = entry => {
  console.log( "Processing ", entry.properties.description )

  return {
    lat: entry.geometry.coordinates[ 1 ],
    long: entry.geometry.coordinates[ 0 ],
    crime_type: entry.properties.crime_type,
    date_time: entry.properties.date_time,
    description: entry.properties.description,
    case_number: entry.properties.case_number,
    address: entry.properties.address,
    zip_code: entry.properties.zip_code,
    beat: entry.properties.beat,
  }
}

const insertCrimeSeedData = json =>
  Promise.all(
    json.features.map( entry => Crime.create( entryToObject( entry )))
  )

fetch( DATA_URL, { method: 'GET', mode: 'cors', })
  .then( result => result.json() )
  .then( insertCrimeSeedData )
  .catch( error => console.log( error ) )
  .then( _ => process.exit() )
