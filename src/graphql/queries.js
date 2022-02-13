import { gql } from '@apollo/client'

export const GET_BOARDS = gql`
  query {
    getAllBoards {
      id
      name
      User {
        name
        email
      }
    }
  }
`

export const LOGIN = gql`
  query logIn($data: LoginInput) {
    logIn(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const GET_USER_BOARDS = gql`
  query getUserBoards($id: ID!) {
    getUserBoards(id: $id) {
      id
      name
    }
  }
`

export const GET_BOARD_TASKS = gql`
  query getBoardTasks($user: ID!, $board: ID!) {
    getBoardTasks(user: $user, board: $board) {
      id
      name
      description
      Status {
        id
      }
      Board {
        id
        name
      }
    }
  }
`
