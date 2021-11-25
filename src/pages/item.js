import React from 'react'

const Item = () => {
  return (
    <div className="board-container">
      <div className="board-header">
        <div className="board-title">
          <i class="fas fa-sort-down"></i>
          <h3>Título da board</h3>
        </div>
      </div>
      <div className="item-container">
        <div className="status toDo">
          <div className="status-header">
            <span>To do</span>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="status-body task">asd</div>
          <div className="plus-item">
            <i class="fas fa-plus-circle"></i>
          </div>
        </div>
        <div className="status doing">
          <div className="status-header">
            <span>Doing</span>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="status-body task">asd</div>
          <div className="plus-item">
            <i class="fas fa-plus-circle"></i>
          </div>
        </div>
        <div className="status done">
          <div className="status-header">
            <span>Done</span>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="status-body task">asd</div>
          <div className="plus-item">
            <i class="fas fa-plus-circle"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
