import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Map from 'google-maps-react'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Map google={window.google} zoom={14}>

          {/* <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow> */}
        </Map>
      </div>
    )
  }
}

export default App
