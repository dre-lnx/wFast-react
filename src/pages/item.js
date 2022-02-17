import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { v4 as uuid } from 'uuid'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'

import { GET_BOARD_TASKS } from '../graphql/queries'
import { CREATE_TASK, UPDATE_TASK_BY_ID } from '../graphql/mutations'
import AuthContext from '../contexts/auth'

//Estilo do modal de edição das tarefas
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 620,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Item = () => {
  //Inicia o hook de definição das colunas padrão em forma de Array de objetos
  const [initialColumnsFromBackEnd, setInitialColumns] = useState([
    {
      id: '1',
      name: 'toDo',
      items: [],
    },
    {
      id: '2',
      name: 'doing',
      items: [],
    },
    {
      id: '3',
      name: 'done',
      items: [],
    },
  ])

  //Inicializa o hook de tarefas
  const [tasks, setTasks] = useState(null)
  //Busca pelos parametros de ID de usuário e ID de board na URL(em caso de mudança do id de usuário manualmente na url há o logout automatico)
  const { userId, boardId, boardName } = useParams()
  //Inicializa o hook que Busca pela tarefa a qual necessita ter o status alterado
  const [statusChangeTask, setStatusChangeTask] = useState(null)
  //Inicializa o hook que busca pelo id do status a ser setado para a tarefa
  const [statusToChange, setStatusToChange] = useState('')

  const [taskId, setTaskId] = useState(null)

  const [taskStatus, setTaskStatus] = useState(null)

  //Inicializa o contexto(para pegar dados setados no localstorage)
  const contexto = useContext(AuthContext)

  //Método para alterar tarefa tomando como referencia seu ID
  const [updateTask] = useMutation(UPDATE_TASK_BY_ID)

  //Lógica para gerenciar a mudança visual de status das tarefas
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })

      //Lógica para gerenciamento de status das tarefas com hooks
      sourceColumn.items.map((item) => {
        destItems.map((destItem) => {
          if (destItem.id === item.id) {
            setStatusChangeTask(destItem)
            setStatusToChange(destColumn.id)
          }
        })
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  //Checa se o status de uma task mudou, caso sim, lança a requisição para mudança da mesma no banco
  useEffect(() => {
    if (statusChangeTask) {
      updateTask({
        variables: {
          id: statusChangeTask.id,
          name: statusChangeTask.name,
          statusId: statusToChange,
          description: statusChangeTask.description,
          boardId: boardId,
          userId: userId,
        },
      })
    }
  }, [statusChangeTask, statusToChange])

  //Método para criar Tarefa
  const [createUserTask, { loading }] = useMutation(CREATE_TASK)

  //Inicializa as colunas padrão tomando como base a inicialização padrão das mesmas
  const [columnsFromBackEnd, setColumnsFromBackEnd] = useState(
    initialColumnsFromBackEnd,
  )

  //Busca pelas tarefas da Board específica do usuário apenas quando for requisitado
  const [getBoards, { error }] = useLazyQuery(GET_BOARD_TASKS)

  const [update, setUpdated] = useState(0)

  //Busca pelas tarefas da Board específica do usuário quando o componente é renderizado e seta o Hook de Tasks
  const { data } = useQuery(GET_BOARD_TASKS, {
    variables: { user: userId, board: boardId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      setTasks(res.getBoardTasks)
      console.log(tasks)
      setUpdated((prevVal) => prevVal + 1)
    },
  })

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
    setDropdown(false)
  }
  const handleClose = () => {
    setOpen(false)
    setDrop(false)
  }

  //Inicia o hook das colunas com o array das colunas padrão(columnsFromBackEnd)
  const [columns, setColumns] = useState(columnsFromBackEnd)

  //Inicia o hook dos status com o array dos nomes dos status
  const [statuses, setStatuses] = useState(['toDo', 'doing', 'done'])

  //Hooks de gerenciamento de dropdowns/etiquetas/status
  const [dropDown, setDropdown] = useState(false)
  const [etiquetaDrop, setDrop] = useState(false)
  const [status, setStatus] = useState(null)
  const [etiqueta, setEtiqueta] = useState('primary')

  //Gerenciamento de dropdowns das colunas
  const toggle = async (val, status) => {
    if (val === true) {
      await setDropdown(false)
      return status
    } else {
      await setDropdown(true)
      return status
    }
  }

  //Gerenciamento das etiquetas das colunas
  const etiquetaToggle = async (val) => {
    if (val === true) {
      return false
    } else {
      return true
    }
  }

  //Gerenciamento da classe do componente para obter a cor da etiqueta desejada
  const toggleEtiquetaColor = (className) => {
    return setEtiqueta(className)
  }

  //Cria tarefa quando requisitado
  const createTask = (column) => {
    statuses.forEach((stts, index) => {
      if (column === stts) {
        createUserTask({
          variables: {
            name: 'New Task',
            statusId: index + 1,
            description: '',
            boardId: boardId,
            userId: contexto.user.id,
          },
          onCompleted: async (res) => {
            setTaskId(res.createTask.id)
            setTaskStatus(index + 1)
            setUpdated((prevVal) => prevVal + 1)
          },
        })
      }
    })
  }

  useEffect(() => {
    console.log(taskId)
    statuses.forEach((stts, index) => {
      if (index + 1 === taskStatus) {
        console.log(index)
        console.log(taskStatus)
        console.log(taskId)
        columns.map((column, key) => {
          if (key === index) {
            column.items.push({
              id: taskId,
              name: 'New Task',
              statusId: index + 1,
              description: '',
              boardId: boardId,
              userId: contexto.user.id,
            })
          }
        })
        console.log(columns)
      }
    })
  }, [update])

  //Monitora a mudança das tarefas disponíveis na inicialização da aplicação e em caso de adição de alguma nova para atualizar as colunas e puxar as novas tasks do banco
  useEffect(() => {
    updateCols()
  }, [tasks])

  //Atualiza/Inicializa colunas e suas tasks
  const updateCols = async () => {
    setColumnsFromBackEnd(initialColumnsFromBackEnd)
    if (tasks) {
      tasks.map((task) => {
        setColumnsFromBackEnd(
          initialColumnsFromBackEnd.map((col) => {
            if (col.id === task.Status.id) {
              col.items.push(task)
            }
          }),
        )
        console.log(columnsFromBackEnd)
      })
    }
  }

  return (
    <>
      <div className="board-header">
        <h3>{boardName}</h3>
      </div>
      <div className="item-container">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <>
                <div className="status">
                  <div className="status-header">
                    <span>{column.name}</span>
                    <i
                      class="fas fa-ellipsis-h"
                      status={column.name}
                      id={column.name}
                      onClick={() =>
                        toggle(dropDown, column.name).then((response) => {
                          setStatus(response)
                        })
                      }
                    ></i>
                    {column.name === status && dropDown === true && (
                      <div className="dropdown-content">
                        <ul>
                          <li
                            onClick={() => {
                              toggle(dropDown, column.name).then((response) => {
                                setStatus(response)
                              })
                              createTask(column.name)
                            }}
                          >
                            <i class="fas fa-plus"></i>Create task
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'lightgrey',
                            borderRadius: 8,
                            padding: 4,
                            width: 250,
                            alignSelf: 'center',
                            minHeight: 500,
                            overflow: 'auto',
                            overflowX: 'hidden',
                            maxHeight: 500,
                          }}
                        >
                          {tasks &&
                            column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <Link to={`/edit/${boardId}/${item.id}`}>
                                        <div>
                                          <div
                                            onClick={handleOpen}
                                            className="task"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            {item.name}
                                          </div>
                                          <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                          >
                                            <Box sx={style}>
                                              <div className="align-input-icons">
                                                <div className="align-text-icons">
                                                  <i class="fas fa-pen"></i>
                                                  <Typography
                                                    id="modal-modal-title"
                                                    variant="h6"
                                                    component="h2"
                                                  >
                                                    Edição de Task
                                                  </Typography>
                                                </div>

                                                <i
                                                  class="fas fa-times"
                                                  onClick={() => handleClose()}
                                                ></i>
                                              </div>
                                              <Typography
                                                id="modal-modal-description"
                                                sx={{ mt: 2 }}
                                              >
                                                <div class="row">
                                                  <div class="col">
                                                    <p className="subtitles">
                                                      Dados gerais
                                                    </p>
                                                    <div class="form-floating mb-3">
                                                      <input
                                                        type="email"
                                                        class="form-control"
                                                        id="floatingInput"
                                                        placeholder="name@example.com"
                                                      />
                                                      <label for="floatingInput">
                                                        Nome
                                                      </label>
                                                    </div>
                                                    <div class="form-floating">
                                                      <textarea
                                                        class="form-control"
                                                        placeholder="Leave a comment here"
                                                        id="floatingTextarea2"
                                                        style={{
                                                          height: '100px',
                                                        }}
                                                      ></textarea>
                                                      <label for="floatingTextarea2">
                                                        Descrição
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="row">
                                                  <div className="align-text-icons">
                                                    <p className="subtitles">
                                                      Seleção de Etiqueta
                                                    </p>
                                                  </div>
                                                  <div class="col col-lg-2">
                                                    <button
                                                      type="button"
                                                      class="btn btn-primary etiquetas-btn flex-x-end"
                                                      onClick={() => {
                                                        etiquetaToggle(
                                                          etiquetaDrop,
                                                        ).then((response) => {
                                                          setDrop(response)
                                                        })
                                                      }}
                                                    >
                                                      <i class="fas fa-tag"></i>
                                                      Etiquetas
                                                    </button>
                                                  </div>
                                                  <div class="col">
                                                    <button
                                                      className={
                                                        'btn btn-' +
                                                        etiqueta +
                                                        ' etiquetas-btn'
                                                      }
                                                      id="selected-etq"
                                                    ></button>
                                                  </div>
                                                </div>
                                                {etiquetaDrop === true && (
                                                  <div class="row etiquetas">
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'primary',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-secondary"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'secondary',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-danger"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'danger',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-warning"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'warning',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-info"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'info',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                    <div class="row">
                                                      <button
                                                        type="button"
                                                        class="btn btn-dark"
                                                        onClick={() => {
                                                          toggleEtiquetaColor(
                                                            'dark',
                                                          )
                                                        }}
                                                      ></button>
                                                    </div>
                                                  </div>
                                                )}
                                                <div class="dropdown-divider"></div>
                                                <div class="row">
                                                  <div class="d-grid gap-2 mt-3">
                                                    <button
                                                      class="btn btn-primary"
                                                      type="button"
                                                    >
                                                      Atualizar Task
                                                    </button>
                                                    <button
                                                      class="btn btn-danger"
                                                      type="button"
                                                    >
                                                      Apagar Task
                                                    </button>
                                                  </div>
                                                </div>
                                              </Typography>
                                            </Box>
                                          </Modal>
                                        </div>
                                      </Link>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </>
            )
          })}
        </DragDropContext>
      </div>
    </>
  )
}

export default Item
