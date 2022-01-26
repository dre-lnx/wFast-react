import { React } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-container-sm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-y-layout input-group" id="signUp-form">
          <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo" />
            <p>Login wFast</p>
          </div>
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
            Criar Conta
          </button>
          <Link to="/login" className="form-link">
            Já possuo uma conta
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
