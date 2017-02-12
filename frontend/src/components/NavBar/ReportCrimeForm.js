import React, { Component } from 'react'
import API from '../../api'

export default class ReportCrimeForm extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      lat: '',
      long: '',
      crime_type: '',
      description: '',
      address: '',
      zip_code: ''
    }
  }

  updateValue( key, value ) {
    this.setState({ [key]: value })
  }

  reportCrime( event ) {
    event.preventDefault()

    const crime_type = this.props.jQuery( 'li.active.selected span' ).text()

    API.Crime.create( Object.assign( {}, this.state, { crime_type } ))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.reportCrime.bind(this)}>
          <InputBox onUpdate={value => this.updateValue( 'lat', value )} label='Lat' />
          <InputBox onUpdate={value => this.updateValue( 'long', value )} label='Long' />
          <SelectCrimeBox onUpdate={value => this.updateValue( 'crime_type', value )} jQuery={this.props.jQuery} />
          <InputBox onUpdate={value => this.updateValue( 'description', value )} label='Description' />
          <InputBox onUpdate={value => this.updateValue( 'address', value )} label='Address' />
          <InputBox onUpdate={value => this.updateValue( 'zip_code', value )} label='Zip Code' />
          <button>Report</button>
        </form>
      </div>
    )
  }
}

class InputBox extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      value: ''
    }
  }

  onChange( event ) {
    const { value } = event.target

    this.setState({ value })

    this.props.onUpdate( value )
  }

  render() {
    return (
      <div className="input-field col s12">
        <label>{this.props.label}</label>
        <input type="text" onChange={this.onChange.bind(this)} value={this.state.value} />
      </div>
    )
  }
}

const CRIME_TYPES = [
  'PROSTITUTION',
  'ROBBERY',
  'VANDALISM',
  'THEFT',
  'BURGLARY',
  'DISTURBING THE PEACE',
  'MURDER',
  'AGGRAVATED ASSAULT',
  'SIMPLE ASSAULT',
  'NARCOTICS',
  'VEHICLE THEFT',
  'GRAFFITI'
]

class SelectCrimeBox extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      value: ''
    }
  }

  onChange( event ) {
    const { value } = event.target
    console.log( value )
    this.setState({ value })

    this.props.onUpdate( value )
  }

  options() {
    return CRIME_TYPES.map( (crime, index) =>
      <option key={`crime-${index}`} value={crime}>{crime}</option>
    )
  }

  componentDidMount() {
    this.props.jQuery( 'select' ).material_select()
  }

  render() {
    return (
      <div className="input-field col s12">
        <select value={this.state.value} ref="fuckthis">
          {this.options()}
        </select>
        <label>Crime Type:</label>
      </div>
    )
  }
}
