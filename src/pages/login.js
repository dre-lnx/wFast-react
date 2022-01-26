import { React } from 'react'
import '../assets/App.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-container-sm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-y-layout" id="signIn-form">
          <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo" />
            <p>Login wFast</p>
          </div>
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
            Fazer Login
          </button>
          <Link to="/signup" className="form-link">
            Ainda não tem uma conta?
          </Link>
          <button className="form-link">Esqueci minha senha</button>
        </div>
      </form>
    </div>
  )
}

export default Login
