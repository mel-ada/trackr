import React, { Component } from 'react'
import ReportCrimeForm from './ReportCrimeForm'

export default class NavForm extends Component {
  selectForm() {
    if( this.props.formName === 'reportCrime' ) {
      return <ReportCrimeForm jQuery={this.props.jQuery} />
    }
  }

  render() {
    if( this.props.formName === '' ) {
      return null
    } else {
      return (
        <div>
          <a class="btn waves-effect waves-teal" onClick={this.props.closeForm}>Close Form</a>
          {this.selectForm()}
        </div>
      )
    }
  }
}
