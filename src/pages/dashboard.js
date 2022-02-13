import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER_BOARDS } from '../graphql/queries'
import AuthContext from '../contexts/auth'

const Dashboard = () => {
  const [boards, setBoards] = useState(null)

  const contexto = useContext(AuthContext)

  console.log(contexto)

  const { error, loading, data } = useQuery(GET_USER_BOARDS, {
    variables: { id: parseInt(contexto.user.id) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      setBoards(res.getUserBoards)
    },
  })

  useEffect(() => {
    console.log(boards)
  }, [boards])

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
            <h2>Boards</h2>
          </div>
          <div className="boardsBody">
            {boards &&
              boards.map((board) => {
                return (
                  <Link to={`item/${contexto.user.id}/${board.id}`}>
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
