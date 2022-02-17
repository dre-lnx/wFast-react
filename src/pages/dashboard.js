import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USER_BOARDS } from '../graphql/queries'
import { CREATE_BOARD } from '../graphql/mutations'
import AuthContext from '../contexts/auth'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '../components/TextField'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'

//Estilo do modal de adição de board
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

//Inicializa o componente principal - Dashboard
const Dashboard = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [boards, setBoards] = useState(null)

  //Inicializa o contexto(para pegar dados setados no localstorage)
  const contexto = useContext(AuthContext)

  //Busca as Boards quando a página carrega
  const { error, data } = useQuery(GET_USER_BOARDS, {
    variables: { id: parseInt(contexto.user.id) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      setBoards(res.getUserBoards)
    },
  })

  //Busca novamente as boards após alguma ser adicionada ou excluída
  const [searchNewBoards] = useLazyQuery(GET_USER_BOARDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      setBoards(res.getUserBoards)
    },
  })

  //Objeto do Yup, ferramenta que busca validar um campo através de atributos
  const validate = Yup.object({
    board: Yup.string().required('Obrigatório'),
  })

  //Adiciona Board
  const [addBoard, { loading }] = useMutation(CREATE_BOARD)

  return (
    <div className="dashboard-container">
      <div className="boards-container">
        <div className="dashboard-sidebar">
          <div className="sidebarContainer">
            <ul className="sidebar-list">
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <li>
                  <i class="far fa-user-circle"></i>Perfil
                </li>
              </Link>
              <li onClick={handleOpen}>
                <i class="far fa-plus-square"></i>Criar Board
              </li>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Adicionar Board
                  </Typography>
                  <Formik
                    initialValues={{
                      board: '',
                    }}
                    validationSchema={validate}
                    onSubmit={async (values, actions) => {
                      const input = {
                        name: values.board,
                        userId: contexto.user.id,
                      }

                      await addBoard({
                        variables: {
                          name: values.board,
                          userId: contexto.user.id,
                        },
                      })

                      searchNewBoards({
                        variables: { id: parseInt(contexto.user.id) },
                      })

                      handleClose()

                      actions.resetForm({
                        values: {
                          board: '',
                        },
                      })
                    }}
                  >
                    <div class="row">
                      <Form>
                        <TextField
                          type="text"
                          label="board"
                          name="board"
                        ></TextField>
                        <button type="submit" class="btn btn-primary me-3">
                          Criar
                        </button>
                        <button
                          type="submit"
                          class="btn btn-danger"
                          onClick={handleClose}
                        >
                          Cancelar
                        </button>
                      </Form>
                    </div>
                  </Formik>
                </Box>
              </Modal>
              <li>
                <i class="fas fa-sliders-h"></i>Preferências
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-header">
            <h2>Boards</h2>
          </div>
          <div className="boardsBody">
            {boards &&
              boards.map((board) => {
                return (
                  <Link
                    to={`item/${contexto.user.id}/${board.name}/${board.id}`}
                  >
                    <div className="boardCard">
                      <span>{board.name}</span>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
