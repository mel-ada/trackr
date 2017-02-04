import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'


export default class OaklandMap extends Component {
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
