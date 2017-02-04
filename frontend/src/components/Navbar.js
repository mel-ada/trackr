import React, { Component } from 'react'

export default class Navbar extends Component {

  render() {
    return(
      <div>
      <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul id="slide-out" className="side-nav fixed">
         <li><div className="userView">
           <a href="#!name"><span className="white-text name">John Doe</span></a>
           <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
         </div></li>
         <li><a href="#!">Second Link</a></li>
         <li><div className="divider"></div></li>
         <li><a className="subheader">Subheader</a></li>
         <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
       </ul>
     </div>
    )
  }
}
