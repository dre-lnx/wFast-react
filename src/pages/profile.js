import React from 'react'
import avatar from '../assets/rick.jpg'

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="pic-frame">
        <img src={avatar} alt="foto de perfil" />
      </div>
    </div>
  )
}

export default Profile
