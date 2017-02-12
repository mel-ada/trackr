import React, { Component } from 'react'
import NavForm from './NavBar/NavForm'
import NavButton from './NavBar/NavButton'

export default class Navbar extends Component {

  constructor( props ) {
    super( props )

    this.state= {
      mapView: 'both',
      currentForm: ''
    }
  }

  onToggleMapView( event ) {
    // this.props.onclick( event.target.id )
  }

  showForm( formName ) {
    console.log( 'showform', formName )
    this.setState({ currentForm: formName })
  }

  closeForm() {
    this.setState({ currentForm: '' })
  }

  render() {
    return(
      <div style={{float: 'left'}}>
        <a href='#' data-activates='slide-out' className='button-collapse'>
          <i className='material-icons'>menu</i>
        </a>

        <ul id='slide-out' className='side-nav fixed'>
          <li>
            <a>Trackr</a>
            <div className='g-signin2' data-onsuccess='onSignIn'></div>
          </li>
          <li><div className='divider'></div></li>

          <li><a onClick={(event) => this.onToggleMapView(event)} className='waves-effect' href='#!' id='toggleView'>Toggle View</a></li>
          <NavButton clickHandler={this.showForm.bind(this)}
            formName='reportCrime'>Report Crime
          </NavButton>

          <li>
            <NavForm
              jQuery={this.props.jQuery}
              formName={this.state.currentForm}
              closeForm={this.closeForm.bind(this)} />
          </li>
        </ul>
       </div>
    )
  }
}
