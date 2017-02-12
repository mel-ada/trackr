const API_URL = 'http://localhost:5000'
const HEADERS = new Headers(
  { 'Accept': 'application/json', 'Content-Type': 'application/json' }
)

const uri = resource =>
  [ API_URL, resource ].join( '/' )

const payload = ( method, content ) => {
  if( content === null ) {
    return { headers: HEADERS, mode: 'cors', method }
  } else {
    return { headers: HEADERS, mode: 'cors', method, body: JSON.stringify( content ) }
  }
}

const apiRequest = ( resource, method='GET', content=null ) =>
  fetch( uri( resource ), payload( method, content ) )
    .then( result => result.json() )
    .catch( error => console.log( error ))

const getAllCrimes = () => apiRequest( 'crimes' )
const getAllSchools = () => apiRequest( 'schools' )
const createCrime = crime => apiRequest( 'crimes', 'POST', crime )

export default {
  Crime: {
    all: getAllCrimes,
    create: createCrime
  },
  School: {
    all: getAllSchools
  }
}
