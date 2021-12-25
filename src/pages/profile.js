import React from 'react'
import avatar from '../assets/rick.jpg'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className="container-fluid profile-container">
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
            <h3>Ricky Astley</h3>
            <span>ricky@email.com</span>
          </div>
          <div className="description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
