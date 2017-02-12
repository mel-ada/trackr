import React, { Component } from 'react'

export default class NavButton extends Component {
  onClick( event ) {
    const { formName, clickHandler } = this.props

    clickHandler( formName )
  }

  render() {
    return (
      <li>
        <a className='waves-effect' onClick={this.onClick.bind(this)}>
          {this.props.children}
        </a>
      </li>
    )
  }
}
