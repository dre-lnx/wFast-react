import { React } from 'react'
import { Link } from 'react-router-dom'
import { ADD_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import logo from '../assets/logo.svg'
import { Form, Formik } from 'formik'
import TextField from '../components/TextField'
import * as Yup from 'yup'

const SignUp = () => {

  const [addUser] = useMutation(ADD_USER)

  const validate = Yup.object({
    name: Yup.string()
      .max(20, 'O Nome pode ter no máximo 20 caracteres')
      .required('Obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Obrigatório'),
    pwd: Yup.string()
      .min(8, 'A senha precisa ter no mínimo 8 caracteres')
      .required('Obrigatório'),
    confirmPwd: Yup.string()
      .oneOf([Yup.ref('pwd'), null], 'As senhas devem ser idênticas')
      .required('A senha de verificação é obrigatória')
  })

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        pwd: '',
        confirmPwd: '',
      }}

      validationSchema={validate}

      onSubmit={(values, actions) => {
        var nome = values.name
        var email = values.email
        var senha = values.pwd

      actions.resetForm({
        values: {
            name: '',
            email: '',
            pwd: '',
            confirmPwd: '',
        }
    })

    addUser({
      variables: { data: { name: nome, email: email, pwd: senha }},
    })

  }}
    >
    {formik => (
    <div className="login-container-sm">
      <Form>
        <div className="form-y-layout input-group" id="signUp-form">
          <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo" />
            <p>Login wFast</p>
          </div>
            <TextField type="text" label="Nome de usuário" name="name"></TextField>
            <TextField type="email" label="E-mail de usuário" name="email"></TextField>
            <TextField type="password" label="Senha" name="pwd"></TextField>
            <TextField type="password" label="Digite Novamente a Senha" name="confirmPwd"></TextField>
          <button type="submit" class="btn btn-success">
            Criar Conta
          </button>
          <Link to="/login" className="form-link">
            Já possuo uma conta
          </Link>
        </div>
      </Form>
    </div>
    )}
    </Formik>
  )
}

export default SignUp
