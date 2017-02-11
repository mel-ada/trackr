import React, { Component } from 'react'

export default class Navbar extends Component {

  constructor( props ) {
    super( props )
    this.state= {
      mapView: 'both'
    }
  }

  onToggleMapView( event ) {
    this.props.onclick( event.target.id )
  }

  render() {
    return(
      <div>
      <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul id="slide-out" className="side-nav fixed">
         <li><a href="#!">Crime Free Kids</a></li>
         <li><div className="divider"></div></li>
         <li><a className="subheader">Toggle Map View</a></li>
         <li><a onClick={(event) => this.onToggleMapView(event)} className="waves-effect" href="#!" id="both">Both</a></li>
         <li><a onClick={(event) => this.onToggleMapView(event)} className="waves-effect" href="#!" id="schools">Schools</a></li>
         <li><a onClick={(event) => this.onToggleMapView(event)} className="waves-effect" href="#!" id="crime">Crime</a></li>
         <div className="g-signin2" data-onsuccess="onSignIn"></div>
       </ul>
     </div>
    )
  }
}
