import React from 'react'
import logo from '../assets/rick.jpg'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="boards-container">
        <div className="dashboard-sidebar">
          <div className="sidebarContainer">
            <div className="dashboard-profile">
              <img src={logo} className="dashboard-avatar" />
              <h4>Ricky Astley</h4>
              <span>ricky69@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-header">
            <h1>Boards</h1>
            <div className="divider"></div>
          </div>
          <div className="boardsBody">
            <div className="boardCard addBoard">
              <span>Criar Board</span>
              <i class="fas fa-plus fa-2x"></i>
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
