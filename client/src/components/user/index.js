import React from 'react'

import UserLayout from '../../hoc/UserLayout'
import MyButton from '../utils/Button'

const UserDashboard = ({user}) => {
  let userInfo = user.userData.data
  return (
    <UserLayout>
      <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>{userInfo.name}</span>
              <span>{userInfo.lastname}</span>
              <span>{userInfo.email}</span>
            </div>
            <MyButton 
              type="default"
              title="Edit account info"
              linkTo="/user/profile"
            />
          </div>

          <div className="user_nfo_panel">
            <h1>History purchases</h1>
            <div className="user_product_block_wrapper">
              history
            </div>
          </div>
      </div>
    </UserLayout>
  )
}

export default UserDashboard