import { React } from 'react'
import '../assets/App.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import TextField from '../components/TextField'
import * as Yup from 'yup'
import { LOGIN } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const LogIn = () => {

  const { data, loading, error } = useQuery(LOGIN, {
    variables: { email, pwd }
  });

  const validate = Yup.object({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Obrigatório'),
    pwd: Yup.string()
      .min(8, 'A senha precisa ter no mínimo 8 caracteres')
      .required('Obrigatório'),
  })

  return (
    <Formik
    initialValues={{
      email: '',
      pwd: '',
    }}


    validationSchema={validate}

    onSubmit={(values, actions) => {
      var email = values.email
      var senha = values.pwd

      actions.resetForm({
        values: {
            email: '',
            pwd: '',
        }
    })
}}
    >
    <div className="login-container-sm">
      <Form>
        <div className="form-y-layout" id="signIn-form">
          <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo" />
            <p>Login wFast</p>
          </div>
            <TextField type="email" label="E-mail de usuário" name="email"></TextField>
            <TextField type="password" label="Senha" name="pwd"></TextField>
          <button type="submit" class="btn btn-primary">
            Fazer Login
          </button>
          <Link to="/signup" className="form-link">
            Ainda não tem uma conta?
          </Link>
          <button className="form-link">Esqueci minha senha</button>
        </div>
      </Form>
    </div>
    </Formik>
  )
}

export default LogIn
