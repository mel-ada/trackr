const DataParser = {
  parseCrimeCoordinates : ( apiData ) => {
    let coordinateSet = []
    for( let crime of apiData ) {
      let lng = crime.geometry.coordinates[0]
      let ltd = crime.geometry.coordinates[1]
      coordinateSet.push( {ltd, lng} )
    }
    return coordinateSet
  }
}

module.exports = DataParser
