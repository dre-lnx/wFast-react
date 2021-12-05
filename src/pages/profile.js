import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <>
      <div>Profile review</div>
      <Link to="profile/edit">
        <div>Editar perfil</div>
      </Link>
    </>
  )
}

export default Profile
