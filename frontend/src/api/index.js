const API_URL = 'http://localhost:5000'
const HEADERS = new Headers(
  { 'Accept': 'application/json', 'Content-Type': 'application/json' }
)

const uri = resource => {
  console.log( [ API_URL, resource ].join( '/' )  )

  return [ API_URL, resource ].join( '/' )
}

const apiRequest = resource =>
  fetch( uri( resource ), { headers: HEADERS, mode: 'cors' } )
    .then( result => result.json() )

const getAllCrimes = () => apiRequest( 'crimes' )
const getAllSchools = () => apiRequest( 'schools' )

export default {
  Crime: {
    all: getAllCrimes
  },
  School: {
    all: getAllSchools
  }
}
