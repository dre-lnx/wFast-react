import React from 'react'
import avatar from '../assets/rick.jpg'

const ProfileEdit = () => {
  return (
    <div className="profile-container">
      <div className="profile-frame">
        <div className="user-frame">
          <img src={avatar} alt="foto de perfil" />
          <div className="user-data form-y-layout">
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
            <textarea placeholder="Descrição"></textarea>
            <button className="form-link">Trocar senha de acesso</button>
            <input
              type="submit"
              name="editInfo"
              value="Atualizar informações"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
