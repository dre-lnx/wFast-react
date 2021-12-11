import React from 'react'
import avatar from '../assets/rick.jpg'

const ProfileEdit = () => {
  return (
    <div className="container-fluid profile-container">
      <div className="profile-frame col">
        <div className="user-frame">
          <div className="user-highlights mb-5">
            <img src={avatar} alt="foto de perfil" />
            <h3>Ricky Astley</h3>
            <span>ricky@email.com</span>
          </div>
          <div className="user-data form-y-layout col">
            <div class="row" style={{ marginBottom: '0px' }}>
              <div class="col">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: '100px' }}
              ></textarea>
              <label for="floatingTextarea2">Comments</label>
            </div>
            <a href="#" class="link-primary">
              Trocar senha de acesso
            </a>
            <button type="button" class="btn btn-primary">
              Atualizar informações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
