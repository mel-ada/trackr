import React, { Component } from 'react'
import { Map, Marker } from 'google-maps-react'

import pubnub from '../pubnub'

const CRIME_CHANNEL = 'crimes'

import API from '../api'

export default class OaklandMap extends Component {
  constructor( props ) {
    super( props )

    pubnub.addListener({ message: this.messageHandler.bind( this ) })
    pubnub.subscribe({ channels: [ 'test', CRIME_CHANNEL ] })

    this.state = {
      oaklandSchoolsData: [],
      oaklandCrimeData: [],
      oaklandCrimeCoordinates: [],
      oaklandSchoolCoordinates: [],
    }
  }

  messageHandler( message ) {
    if( message.channel === CRIME_CHANNEL ) {
      const currentData = this.state.oaklandCrimeData
      const currentCoordinates = this.state.oaklandCrimeCoordinates

      this.setState({
        oaklandCrimeData: [ ...currentData, message.message ],
        oaklandCrimeCoordinates: [
          ...currentCoordinates,
          { lat: message.message.lat, lng: message.message.lng }
        ]
      })

      console.log( message.message )
    }
  }

  componentWillMount() {
    Promise.all([ API.Crime.all(), API.School.all() ])
      .then( ([ crimes, schools ]) => {
        this.setState({
          oaklandSchoolsData: schools,
          oaklandSchoolCoordinates: schools.map( school =>
            ({ lat: school.lat, lng: school.long })
          ),
          oaklandCrimeData: crimes,
          oaklandCrimeCoordinates: crimes.map( crime =>
            ({ lat: crime.lat, lng: crime.long })
          ),
        })
      })
  }

  toggleData() {

  }

  googleMap() {
    return (
      <Map google={window.google} zoom={13} initialCenter={{lat: 37.8044, lng: -122.2711}}>
        {this.state.oaklandCrimeCoordinates.map((latLng, index) => {
          return <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={latLng}
          key={index}
        />})}
        {this.state.oaklandSchoolCoordinates.map((latLng, index) => {
          return <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={latLng}
          key={index}
        />})}
        </Map>
    )
  }

  render () {
    console.log( 'rendering' )

    return (
      <div>{this.googleMap()}</div>
    )
  }
}
