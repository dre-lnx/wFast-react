import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useParams } from 'react-router-dom'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { v4 as uuid } from 'uuid'
import { useQuery } from '@apollo/client'

import { GET_BOARD_TASKS } from '../graphql/queries'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 560,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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

const Item = () => {
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

  const [columnsFromBackEnd, setColumnsFromBackEnd] = useState(
    initialColumnsFromBackEnd,
  )

  const [tasks, setTasks] = useState(null)
  const { userId, boardId } = useParams()

  const { data, error, loading } = useQuery(GET_BOARD_TASKS, {
    variables: { user: userId, board: boardId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      console.log(res)
      setTasks(res.getBoardTasks)
    },
  })

  useEffect(() => {
    setColumnsFromBackEnd(initialColumnsFromBackEnd)
    if (tasks && data) {
      tasks.map((task) => {
        return setColumnsFromBackEnd(
          initialColumnsFromBackEnd.map((col) => {
            if (col.id === task.Status.id) {
              col.items.push(task)
            }
          }),
        )
      })
      console.log(columnsFromBackEnd)
      console.log(tasks)
    }
  }, [tasks])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
    setDropdown(false)
  }
  const handleClose = () => {
    setOpen(false)
    setDrop(false)
  }

  const [columns, setColumns] = useState(columnsFromBackEnd)
  const [statuses, setStatuses] = useState(['toDo', 'doing', 'done'])

  const [dropDown, setDropdown] = useState(false)
  const [etiquetaDrop, setDrop] = useState(false)

  const [status, setStatus] = useState(null)

  const [etiqueta, setEtiqueta] = useState('primary')

  const toggle = async (val, status) => {
    if (val === true) {
      await setDropdown(false)
      return status
    } else {
      await setDropdown(true)
      return status
    }
  }

  const etiquetaToggle = async (val) => {
    if (val === true) {
      return false
    } else {
      return true
    }
  }

  const toggleEtiquetaColor = (className) => {
    console.log(className)
    return setEtiqueta(className)
  }

  const createTask = (column) => {
    statuses.forEach((stts, index) => {
      if (column === stts) {
        columns[index].items.push({ id: uuid(), name: 'New Task' })
      }
    })
  }

  const deleteAllTasks = (column) => {
    statuses.forEach((stts, index) => {
      if (column === stts) {
        columns[index].items.length = 0
        console.log(columns[index].items)
      }
    })
  }
  return (
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
                            createTask(column.name)
                            toggle(dropDown, column.name).then((response) => {
                              setStatus(response)
                            })
                          }}
                        >
                          <i class="fas fa-plus"></i>Create task
                        </li>
                        <li
                          onClick={() => {
                            deleteAllTasks(column.name)
                            toggle(dropDown, column.name).then((response) => {
                              setStatus(response)
                            })
                          }}
                        >
                          <i class="far fa-trash-alt"></i>Delete All tasks
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
  )
}

export default Item
