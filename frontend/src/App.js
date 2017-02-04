import React, { Component } from 'react'
import Navbar from './components/Navbar'
import OaklandMap from './components/OaklandMap'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <OaklandMap />
      </div>
    )
  }
}

export default App
