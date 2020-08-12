import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormField from '../utils/forms/FormField'
import { update, generateData, isFormValid } from '../utils/forms/formActions'
import { registerUser } from '../../actions/user'
import Dialog from '@material-ui/core/Dialog'

export class Register extends Component {

  state = {
    formError: false,
    formSuccess: false,
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
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter you name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter you lastname'
        },
        validation: {
          required: true
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  submitForm = (event) => {
    event.preventDefault()

    let dataToSubmit = generateData(this.state.formdata, 'register')
    let formIsValid = isFormValid(this.state.formdata, 'register')

    if(formIsValid) {
      this.props.dispatch(registerUser(dataToSubmit)).then(resposne => {
        if(resposne.payload.success) {
          console.log(resposne.payload.data)
          this.setState({
            formError: false,
            formSuccess: true
          })

          setTimeout(() => {
            this.props.history.push('/auth')
          }, 3000);
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
    const newFormdata = update(element, this.state.formdata, 'register')
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={(event) => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField 
                      id={'name'}
                      formdata={this.state.formdata.name}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField 
                      id={'lastname'}
                      formdata={this.state.formdata.lastname}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField 
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element) => this.updateForm(element)}
                  />
                </div>
                <div className="form_block_two">
                  <div className="block">
                    <FormField 
                      id={'password'}
                      formdata={this.state.formdata.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField 
                      id={'confirmPassword'}
                      formdata={this.state.formdata.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                

                {
                  this.state.formError ? 
                    (
                      <div className="error_label">Please check your data</div>
                    )
                  :null
                }
                <button onClick={(event) => this.submitForm(event)}>Register</button>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations!!</div>
            <div>
              You will be redirected to the login in a few seconds...
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect()(Register)
