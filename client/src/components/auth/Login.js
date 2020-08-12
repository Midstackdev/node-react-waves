import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormField from '../utils/forms/FormField'
import { update, generateData, isFormValid } from '../utils/forms/formActions'
import { loginUser } from '../../actions/user'

export class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter you email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter you password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  submitForm = (event) => {
    event.preventDefault()

    let dataToSubmit = generateData(this.state.formdata, 'login')
    let formIsValid = isFormValid(this.state.formdata, 'login')

    if(formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(resposne => {
        if(resposne.payload.success) {
          console.log(resposne.payload.data)
          this.props.history.push('/user/dashboard')
        }else {
          this.setState({
            formError: true
          })
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }

  }
  
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login')
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField 
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {
            this.state.formError ? 
              (
                <div className="error_label">Please check your data</div>
              )
            :null
          }
          <button onClick={(event) => this.submitForm(event)}>Login</button>
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(Login))
