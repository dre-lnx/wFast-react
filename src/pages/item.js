import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { v4 as uuid } from 'uuid'

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

const itemsFromBackEnd = [
  { id: uuid(), content: 'First Task' },
  { id: uuid(), content: 'Second Task ' },
  { id: uuid(), content: 'Third Task ' },
  { id: uuid(), content: 'Fourth Task ' },
]

const columnsFromBackEnd = {
  [uuid()]: {
    name: 'toDo',
    items: itemsFromBackEnd,
  },
  [uuid()]: {
    name: 'doing',
    items: [],
  },
  [uuid()]: {
    name: 'done',
    items: [],
  },
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

const createTask = () => {
  itemsFromBackEnd.push({ id: uuid(), content: 'Nova Tarefa' })
  console.table(itemsFromBackEnd)
}

const Item = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [columns, setColumns] = useState(columnsFromBackEnd)

  const [dropDown, setDropdown] = useState(false)

  const [status, setStatus] = useState(null)

  const toggle = async (val, status) => {
    if (val === true) {
      await setDropdown(false)
      return status
    } else {
      await setDropdown(true)
      return status
    }
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
                            createTask()
                            toggle(dropDown, column.name).then((response) => {
                              setStatus(response)
                            })
                          }}
                        >
                          <i class="fas fa-plus"></i>Create task
                        </li>
                        <li>
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
                        {column.items.map((item, index) => {
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
                                      {item.content}
                                    </div>
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
                                          Editando uma task
                                        </Typography>
                                        <Typography
                                          id="modal-modal-description"
                                          sx={{ mt: 2 }}
                                        >
                                          Isso definitivamente ainda não ta
                                          funcionando
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
