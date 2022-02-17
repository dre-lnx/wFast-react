import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import TextField from '../components/TextField'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { GET_TASK_BY_ID } from '../graphql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_TASK_BY_ID, DELETE_TASK_BY_ID } from '../graphql/mutations'
import AuthContext from '../contexts/auth'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const TaskEdit = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const contexto = useContext(AuthContext)

  const { boardId, id } = useParams()
  const [info, setinfo] = useState(null)
  const [newInfo, setNewInfo] = useState(null)

  const { data, loading } = useQuery(GET_TASK_BY_ID, {
    variables: { id: id },
  })

  const [updateTask] = useMutation(UPDATE_TASK_BY_ID)

  useState(() => {
    if (data) {
      console.log(data)
      setinfo(data.getTaskById)
    }
  }, [data])

  const [deleteTask, { error }] = useMutation(DELETE_TASK_BY_ID)

  const excluir = async (taskId) => {
    await deleteTask({
      variables: { id: taskId },
    })
  }

  const validate = Yup.object({
    name: Yup.string().required('Obrigatório'),
    description: Yup.string().max(
      255,
      'A senha precisa ter no máximo 255 caracteres',
    ),
  })
  return (
    <div class="task-edit-form">
      {data && (
        <Formik
          initialValues={{
            name: data.getTaskById.name,
            description: data.getTaskById.description,
          }}
          validationSchema={validate}
          onSubmit={async (values, actions) => {
            console.log(values.board)

            await updateTask({
              variables: {
                id: id,
                name: values.name,
                statusId: data.getTaskById.Status.id,
                description: values.description,
                boardId: data.getTaskById.Board.id,
                userId: contexto.user.id,
              },
              onCompleted: async (res) => {
                setNewInfo(res.updateTask)
              },
            })

            actions.resetForm({
              values: {
                name: newInfo.name,
                description: newInfo.description,
              },
            })
          }}
        >
          <Form>
            <TextField type="text" label="Nome da task" name="name"></TextField>
            <TextField
              type="text"
              label="descrição da task"
              name="description"
            ></TextField>
            <button type="submit" class="btn btn-primary me-3">
              Atualizar
            </button>
            <button
              type="button"
              class="btn btn-danger me-3"
              onClick={handleOpen}
            >
              Apagar
            </button>
            <Link to={`/item/${contexto.user.id}/${boardId}`}>
              <button
                type="submit"
                onClick={handleClose}
                class="btn btn-danger"
              >
                Cancelar
              </button>
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
                    Você deseja realmente apagar esta tarefa?
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <button
                      type="button"
                      class="btn btn-primary me-3"
                      onClick={() => excluir(id)}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger me-3"
                      onClick={handleClose}
                    >
                      Não
                    </button>
                  </Typography>
                </Box>
              </Modal>
            </Link>
          </Form>
        </Formik>
      )}
    </div>
  )
}

export default TaskEdit
