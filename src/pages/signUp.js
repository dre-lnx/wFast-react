import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { ADD_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import logo from '../assets/logo.svg'

const SignUp = () => {
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [addUser, { data, loading, error }] = useMutation(ADD_USER)

  const handleSubmit = (e) => {
    e.preventDefault()

    addUser({
      variables: { data: { name: userName, email: email, pwd: password }},
    })
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
              onChange={(event) => setUsername(event.target.value)}
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label for="floatingInput">Endereço de E-mail</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <label for="floatingPassword">Senha</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
            <label for="floatingPassword">Digite Novamente a Senha</label>
          </div>
          <button type="submit" class="btn btn-success">
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
