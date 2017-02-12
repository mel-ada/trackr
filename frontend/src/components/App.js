import React, { Component } from 'react'
import Navbar from './Navbar'
import OaklandMap from './OaklandMap'

export default class App extends Component {
  constructor( props ) {
    super( props )

    this.state = { toggleData: 'both' }
    this.toggleMap = this.toggleMap.bind(this)
  }

  toggleMap( data ) {
    this.setState({
      toggleData: data
    })
  }

  render() {
    console.log( this.state )

    return (
      <div className="App">
        <Navbar jQuery={this.props.jQuery} />
        <OaklandMap mapView={this.state.toggleData} />
      </div>
    )
  }
}
