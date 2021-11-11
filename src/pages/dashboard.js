import React from 'react'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="boards-container">
        <div className="dashboard-sidebar">
          <div className="dashboard-header">
            <h3>Boards</h3>
          </div>
          <ul className="sidebar-list-container">
            <li>
              <i class="fas fa-plus"></i>Create Board
            </li>
          </ul>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-header">
            <h3>Bem vindo, Rick</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
