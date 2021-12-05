import React from 'react'
import avatar from '../assets/rick.jpg'

const ProfileEdit = () => {
  return (
    <div className="profile-container">
      <div className="profile-frame">
        <div className="user-frame">
          <div className="user-highlights">
            <img src={avatar} alt="foto de perfil" />
            <h3>Ricky Astley</h3>
            <span>ricky@email.com</span>
          </div>
          <div className="user-data form-y-layout">
            <div className="inline-fields">
              <input type="text" name="nome" placeholder="nome" />
              <input type="text" name="email" placeholder="email" />
            </div>
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
