import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import avatar from '../assets/rick.jpg'
import TextField from '../components/TextField'
import AuthContext from '../contexts/auth'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { UPDATE_USER_BY_ID } from '../graphql/mutations'
import { GET_USER_BY_ID } from '../graphql/queries'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'

const ProfileEdit = () => {

//Inicializa o contexto(para pegar dados setados no localstorage)
  const contexto = useContext(AuthContext)

  //Inicializa o hook responsável por receber obj de dados de usuário(não recebe senha!)
  const [ usrObj, setUsrObj ] = useState(null)

  //Busca por dados de usuário a partir do seu ID
  const { error } = useQuery(GET_USER_BY_ID, {
    variables: { id: parseInt(contexto.user.id) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async(res) => {
      console.log(res)
    }
  })

  //Seta o Yup(ferramenta de validação dos campos)
  const validate = Yup.object({
    name: Yup.string()
      .max(20, 'O Nome pode ter no máximo 20 caracteres')
      .required('Obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Obrigatório'),
    description: Yup.string()
      .max(250, 'A descrição pode ter no máximo 250 caracteres'),
  })


  //Atualiza dados de usuário por meio de seu ID
  const [ updateUser, { data, loading } ] = useMutation(UPDATE_USER_BY_ID)

  //Atualiza o localstorage por meio de um método disponível no contexto tomando como parametro o objeto de informações inicial sempre que ele for atualizado
  useEffect(() => {
    if(data) {
      contexto.Update(usrObj)
    }
  }, [usrObj])

  //const [authUser, { error }] = useLazyQuery(LOGIN)


  return (
    <div className="container-fluid profile-container">
      <div className="profile-frame col">
        <div className="user-frame">
          <div className="user-highlights mb-5">
            <img src={avatar} alt="foto de perfil" />
            <h3>{contexto.user.name}</h3>
            <span>{contexto.user.email}</span>
          </div>
          <Formik
                    initialValues={{
                      name: contexto.user.name,
                      email: contexto.user.email,
                      description: contexto.user.description,
                    }}
                    validationSchema={validate}
                    onSubmit={async (values, actions) => {
                      console.log(values.board)

                      await updateUser({
                        variables: {
                          id: contexto.user.id,
                          name: values.name,
                          email: values.email,
                          description: values.description,
                        },
                        onCompleted: async(res) => {
                           setUsrObj(res.updateUser)
                        }
                      })

                      actions.resetForm({
                        values: {
                          name: values.name,
                          email: values.email,
                          description: values.description,
                        },
                      })
                    }}
                  >
                      <Form>
          <div className="user-data form-y-layout col">
            <div class="row" style={{ marginBottom: '0px' }}>
              <div class="col">
                <TextField type="text" label="name" name="name"></TextField>
              </div>
              <div class="col">
              <TextField type="email" label="email" name="email"></TextField>
              </div>
            </div>
            <div class="form-floating">
              <TextField type="text" label="description" name="description"></TextField>
            </div>
            <a href="#" class="link-primary">
              Trocar senha de acesso
            </a>
            <button type="submit" class="btn btn-primary">
              Atualizar informações
            </button>
          </div>
          </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
