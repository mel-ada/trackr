import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import pubnub from '../pubnub'

const CRIME_CHANNEL = 'crimes'

import API from '../api'

export default class OaklandMap extends Component {
  constructor( props ) {
    super( props )

    pubnub.addListener({ message: this.messageHandler.bind( this ) })
    pubnub.subscribe({ channels: [ 'test', CRIME_CHANNEL ] })

    this.state = { crimes: [], schools: [], view: 'all' }
  }

  messageHandler( message ) {
    if( message.channel === CRIME_CHANNEL ) {
      this.setState({ crimes: [ ...this.state.crimes, message.message ] })

      console.log( message.message )
    }
  }

  componentWillMount() {
    Promise.all([ API.Crime.all(), API.School.all() ])
      .then( ([ crimes, schools ]) => {
        this.setState({ schools, crimes })
      })
  }

  toggleData() {

  }

  render () {
    return (
      <GoogleMap center={{lat: 37.8044, lng: -122.2711}}
        bootstrapURLKeys={{ key: 'AIzaSyA0HJimNKn4IV3xfBazRFncKrEFK1WJIYo' }}
        defaultZoom={13}
        style={{flex: 1}}>
        {this.state.crimes.map( (crime, index) =>
          <CrimeMarker lng={crime.long} {...crime} key={`crime-${index}`} />
        )}
        {this.state.schools.map( (school, index) =>
          <SchoolMarker lng={school.long} {...school} key={`school-${index}`} />
        )}
      </GoogleMap>
    )
  }
}

class CrimeMarker extends Component {
  crimeType() {
    return this.props.crime_type.toLowerCase().replace( ' ', '-' )
  }

  render() {
    return (
      <div className='crime-marker marker-container'>
        <div className='marker'>
          <div className={`crime-type  ${this.crimeType()}`}></div>
        </div>
        <div className='description'>
          <div className='type'>{this.props.crime_type}</div>
          <div className='address'>{this.props.address}</div>
        </div>
      </div>
    )
  }
}

class SchoolMarker extends Component {
  render() {
    return (
      <div className='school-marker marker-container'>
        <div className='marker'></div>
        <div className='description'>
          <div className='type'>{this.props.school}</div>
          <div className='address'>{this.props.address}</div>
        </div>
      </div>
    )
  }
}
