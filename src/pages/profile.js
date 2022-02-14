import React, { useContext } from 'react'
import avatar from '../assets/rick.jpg'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/auth'

const Profile = () => {

  const contexto = useContext(AuthContext)

  return (
    <div className="container-fluid profile-container container-pattern">
      <div className="flex-x-end">
        <Link to="profile/edit">
          <button type="button" class="btn btn-outline-primary">
            Atualizar Informações <i class="fas fa-pen edit-profile"></i>
          </button>
        </Link>
      </div>
      <div className="profile-frame col">
        <div className="user-frame">
          <div className="user-highlights mb-5">
            <img src={avatar} alt="foto de perfil" />
            <h3>{contexto.user.name}</h3>
            <span>{contexto.user.email}</span>
          </div>
          <div className="description">
            <p>
            {contexto.user.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
