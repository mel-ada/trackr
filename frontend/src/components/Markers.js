import React, { Component } from 'react'
import {Marker} from 'google-maps-react'

export default class Markers extends Component{
  render() {
    return(
      <div>
      {this.props.dataSet.map((latLng, index) => {
        return <Marker
        onClick={this.onMarkerClick}
        name={'Current location'}
        position={latLng}
        key={index}
      />})}
    </div>
    )
  }
}
