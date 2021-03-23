import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Login',
        linkTo: '/auth',
        public: true
      },
      {
        name: 'Logout',
        linkTo: '/user/logout',
        public: false
      }
    ]
  }

  defaultLink = (item, i) => (
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  )

  showLinks = (type) => {
    let list = []
    if(this.props.user.userData) {
      type.forEach((item) => {
        // console.log(this.props.user.userData.success)
        if(!this.props.user.userData.data.isAuth) {
          if(item.public) {
            list.push(item)
          }else {
            if(item.name !== 'Login') {
              list.push(item)
            }
          }
        }
      })
    }

    return list.map((item, i) => {
      return this.defaultLink(item, i)
    })
  } 

  render() {
    // console.log(this.props.user.userData)
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">
              Waves
            </div>
          </div>
          <div className="right">
            <div className="top">
              {this.showLinks(this.state.user)}
            </div>
            <div className="bottom">
              {this.showLinks(this.state.page)}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header)
