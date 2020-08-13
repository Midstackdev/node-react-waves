import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/user'
import CircularProgress from '@material-ui/core/CircularProgress'


export default function (ComposedClass, reload, adminRoute = null) {

    class Auth extends Component {

      state = {
        loading: true
      }

      componentDidMount() {
        this.props.dispatch(auth()).then(response => {
          let user = this.props.user.userData.data
          // console.log(user)

          if(user.isAuth) {
            if(adminRoute && !user.isAdmin) {
              this.props.history.push('/user/dashboard')
            }else {
              if(reload === false) {
                this.props.history.push('/user/dashboard')
              }
            }
          }

          this.setState({
            loading: false
          })
        }).catch(error => {
          if(!error.response.data.success) {
            if(reload) {
              this.props.history.push('/auth')
            }
          }

          this.setState({
            loading: false
          })
        })
      }

      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
      }

      render() {
        if(this.state.loading) {
          return (
            <div className="main_loader">
              <CircularProgress 
                style={{
                  color: '#2196F3'
                }}
                thickness={7}
              />
            </div>
          )
        }
        return (
          <div>
            <ComposedClass {...this.props} user={this.props.user} />
          </div>
        )
      }
    }

    const mapStateToProps = state => ({
      user: state.user
    })
    
    return connect(mapStateToProps)(Auth) 
}
