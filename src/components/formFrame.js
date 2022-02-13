import { React, useState, useEffect } from 'react'
import logo from '../assets/logo.svg'
import ReactDOM from 'react-dom'

const FormFrame = () => {
  const [form, setForm] = useState(false)

  useEffect(() => {
    console.log(form)
  }, [form])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-container-sm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-y-layout" id="signIn-form">
          <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo" />
            {form === true && <p>Cadastro wFast</p>}
            {form === false && <p>Login wFast</p>}
          </div>
          {form === false && (
            <>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Endereço de E-mail</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Senha</label>
              </div>
              <button type="button" class="btn btn-primary">
                Login
              </button>
              <button
                className="form-link"
                onClick={() => {
                  setForm(true)
                }}
              >
                Ainda não tem uma conta?
              </button>
              <button className="form-link">Esqueci minha senha</button>
            </>
          )}
        </div>
        {form === true && (
          <div className="form-y-layout input-group" id="signUp-form">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Name"
              />
              <label for="floatingInput">Nome</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Surname"
              />
              <label for="floatingInput">Sobrenome</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="Email"
              />
              <label for="floatingInput">Endereço de E-mail</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Senha</label>
            </div>
            <button type="button" class="btn btn-success">
              SignUp
            </button>
            <button
              className="form-link"
              onClick={() => {
                setForm(false)
              }}
            >
              Já possuo uma conta
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default FormFrame
