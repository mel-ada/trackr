import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import DataParser from './scripts/data'

export default class OaklandMap extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      OaklandSchoolsData: [],
      OaklandCrimeData: [],
      OaklandCrimeCoordinates: [],
    }
  }

  componentWillMount() {
    this.getOaklandSchoolsData()
    this.getOaklandCrimeData()
  }

  getOaklandSchoolsData() {
    fetch( 'https://data.oaklandnet.com/resource/d6pc-iyaw.json', {
      method: 'GET',
      mode: 'cors'
    })
    .then( response => response.json() )
    .then( results => {
      this.setState({
        OaklandSchoolsData: results
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

  render () {
    // console.log('hi :')

    return (
      <div>
      <Map google={window.google} zoom={10} initialCenter={{lat: 37.8044, lng: -122.2711}}>
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={{lat: 39.8044, lng: -125.2711}}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={{lat: 34.8044, lng: -190.2711}}
        />

          <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
          </InfoWindow>
        </Map>
        <Marker mapCenter={{lat: 39.8044, lng: -125.2711}} />
      </div>
    )
  }
}
