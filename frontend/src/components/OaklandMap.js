import React, { Component } from 'react'
import { Map, Marker} from 'google-maps-react'
import DataParser from './scripts/data'
export default class OaklandMap extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      OaklandSchoolsData: [],
      OaklandCrimeData: [],
      OaklandCrimeCoordinates: [],
      OaklandSchoolCoordinates: [],
    }
  }

  componentWillMount() {
    // Promise.all(
    //   [
    this.getOaklandCrimeData()
    this.getOaklandSchoolsData()
    //   ]
    // )
  }

  getOaklandSchoolsData() {
    fetch( 'https://data.oaklandnet.com/resource/d6pc-iyaw.json', {
      method: 'GET',
      mode: 'cors'
    })
    .then( response => response.json() )
    .then( results => {
      this.setState({
        OaklandSchoolsData: results,
        OaklandSchoolCoordinates: DataParser.parseSchoolData( results )
      })
    })
  }

  getOaklandCrimeData() {
    fetch( 'http://oakland.crimespotting.org/crime-data?format=json&dstart=2013-01-01&dend=2013-12-31&count=150', {
      method: 'GET',
      mode: 'cors',
    })
    .then( response => response.json() )
    .then( results => {
      this.setState({
        OaklandCrimeData: results.features,
        OaklandCrimeCoordinates: DataParser.parseCrimeCoordinates(results.features)

      })
    })
  }

  toggleData() {

  }

  render () {
    return (
      <div>
      <Map google={window.google} zoom={13} initialCenter={{lat: 37.8044, lng: -122.2711}}>
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={{lat: 39.8044, lng: -125.2711}}
        />
        {this.state.OaklandCrimeCoordinates.map((latLng, index) => {
          return <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={latLng}
          key={index}
        />})}
        {this.state.OaklandSchoolCoordinates.map((latLng, index) => {
          return <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={latLng}
          key={index}
        />})}
        </Map>
      </div>
    )
  }
}
