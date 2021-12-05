import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="boards-container">
        <div className="dashboard-sidebar">
          <div className="sidebarContainer">
            <ul className="sidebar-list">
              <Link to="/profile">
                <li>
                  <i class="far fa-user-circle"></i>Perfil
                </li>
              </Link>
              <li>
                <i class="far fa-plus-square"></i>Criar Board
              </li>
              <li>
                <i class="fas fa-sliders-h"></i>Preferências
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-header">
            <h1>Boards</h1>
          </div>
          <div className="boardsBody">
            <div className="boardCard">
              <span>Título da board</span>
            </div>
            <div className="boardCard">
              <span>Título da board</span>
            </div>
            <div className="boardCard">
              <span>Título da board</span>
            </div>
            <div className="boardCard">
              <span>Título da board</span>
            </div>
            <div className="boardCard">
              <span>Título da board</span>
            </div>
            <div className="boardCard">
              <span>Título da board</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
