import React, { Component } from 'react'
import Navbar from './Navbar'
import OaklandMap from './OaklandMap'
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <OaklandMap />
      </div>
    )
  }
}
