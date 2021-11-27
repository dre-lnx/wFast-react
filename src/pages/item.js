import React, { useEffect, useState } from 'react'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { v4 as uuid } from 'uuid'

const itemsFromBackEnd = [
  { id: uuid(), content: 'First Task' },
  { id: uuid(), content: 'Second Task ' },
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

const Item = () => {
  const [columns, setColumns] = useState(columnsFromBackEnd)

  const [dropDown, setDropdown] = useState(false)

  const toggle = (val) => {
    if (val === true) {
      setDropdown(false)
    } else {
      setDropdown(true)
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
                    onClick={() => toggle(dropDown)}
                  ></i>
                  {dropDown === true && (
                    <div className="dropdown-content">
                      <ul>
                        <li>
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
                                  <div
                                    className="task"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {item.content}
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
