const DataParser = {
  parseCrimeCoordinates : apiData => {
    let coordinateSet = []
    for( let crime of apiData ) {
      let lng = crime.geometry.coordinates[0]
      let lat = crime.geometry.coordinates[1]
      coordinateSet.push( {lat, lng} )
    }
    return coordinateSet
  },

  parseSchoolData : apiData => {
    let coordinateSet = []
    for( let school of apiData ) {
      let lng = school.address.longitude
      let lat = school.address.latitude
      coordinateSet.push( {lat, lng} )
    }
    return coordinateSet
  }
}

module.exports = DataParser
