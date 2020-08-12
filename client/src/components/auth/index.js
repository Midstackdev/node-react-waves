import React from 'react'
import MyButton from '../utils/Button'
import Login from './Login'

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis numquam laborum culpa perferendis officia. Reprehenderit et impedit aperiam itaque, ratione minus, odio tenetur alias doloribus exercitationem fugiat inventore hic consequuntur!</p>
            <MyButton 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Register Customers</h2>
            <p className="">If you have an account please login here.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLogin
