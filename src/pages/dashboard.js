import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { GET_BOARDS } from '../graphql/queries'

const boardsFromBackEnd = [
  {
    id: 0,
    title: 'Título da Board',
  },
  {
    id: 1,
    title: 'Título da Board',
  },
  {
    id: 2,
    title: 'Título da Board',
  },
  {
    id: 3,
    title: 'Título da Board',
  },
  {
    id: 4,
    title: 'Título da Board',
  },
  {
    id: 5,
    title: 'Título da Board',
  },
  {
    id: 6,
    title: 'Título da Board',
  },
  {
    id: 7,
    title: 'Título da Board',
  },
  {
    id: 8,
    title: 'Título da Board',
  },
]

const Dashboard = () => {
  const [boards, setBoards] = useState(null)

  const { error, loading, data } = useQuery(GET_BOARDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: async (res) => {
      await setBoards(res.getAllItems)
      console.log(boards)
    },
  })

  useEffect(() => {
    console.log(data)
  }, [data])

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
                  <div className="boardCard">
                    <span>{board.name}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
