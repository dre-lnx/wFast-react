import React from 'react'
import avatar from '../assets/rick.jpg'

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-frame">
        <div className="user-frame">
          <img src={avatar} alt="foto de perfil" />
          <div className="user-data">
            <h2>Ricky Astley</h2>
            <span>ricky@email.com</span>
          </div>
        </div>
        <div className="edit-user-form form-y-layout">
          <h3>Edição de Dados Pessoais</h3>
          <input
            type="text"
            name="nome"
            value="Ricky Astley"
            placeholder="nome"
          />
          <input
            type="text"
            name="email"
            value="ricky@email.com"
            placeholder="email"
          />
          <button className="form-link">Esqueci minha senha</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
