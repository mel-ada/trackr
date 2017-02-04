import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'


export default class OaklandMap extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      OaklandSchoolsData: [],
      OaklandCrimeData: []
    }
  }

  componentDidMount() {
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
        OaklandCrimeData: results
      })
    })
  }

  render () {
    return (
  <Map google={window.google} zoom={10} initialCenter={{lat: 37.8044, lng: -122.2711}}>

    <Marker onClick={this.onMarkerClick}
      name={'Current location'} />

      <InfoWindow onClose={this.onInfoWindowClose}>
        {/* <div>
          <h1>{this.state.selectedPlace.name}</h1>
        </div> */}
      </InfoWindow>
    </Map>
    )
  }
}
