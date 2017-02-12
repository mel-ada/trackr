const pgp = require( 'pg-promise' )()
const db = pgp( process.env.DATABASE_URL )

const allCrimes = () =>
  db.any( 'SELECT * FROM crimes' )

const CREATE_CRIME_SQL = `
  INSERT INTO crimes (
    lat, long, crime_type, date_time, description, address, zip_code
  ) VALUES (
    \${lat}, \${long}, \${crime_type}, now(), \${description}, \${address}, \${zip_code}
  ) RETURNING *
`

const createCrime = crime =>
  db.any( CREATE_CRIME_SQL, crime )

const allSchools = () =>
  db.any( 'SELECT * FROM schools' )

const CREATE_SCHOOL_SQL = `
  INSERT INTO schools (
    lat, long, address, school, phone, type
  ) VALUES (
    \${lat}, \${long}, \${address}, \${school}, \${phone}, \${type}
  )
`

const createSchool = school =>
  db.any( CREATE_SCHOOL_SQL, school )

module.exports = {
  Crime: {
    all: allCrimes,
    create: createCrime
  },
  School: {
    all: allSchools,
    create: createSchool
  }
}
