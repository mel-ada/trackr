import React, { Component } from 'react'
import Navbar from './Navbar'
import OaklandMap from './OaklandMap'
export default class App extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      toggleData: 'both'
    }
    this.toggleMap = this.toggleMap.bind(this)
  }

  toggleMap( data ) {
    this.setState({
      toggleData: data
    })
  }

  render() {
      console.log(this.state.toggleData)
    return (
      <div className="App">
        <Navbar onclick={this.toggleMap} />
        <OaklandMap mapView={this.state.toggleData} />
      </div>
    )
  }
}
