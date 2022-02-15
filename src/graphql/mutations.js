import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation createUser($data: UserInput) {
    createUser(data: $data) {
      name
      email
      pwd
    }
  }
`
export const CREATE_BOARD = gql`
  mutation createBoard($name: String!, $userId: ID!) {
    createBoard(data: { name: $name, userId: $userId }) {
      name
    }
  }
`

export const UPDATE_USER_BY_ID = gql`
  mutation UpdateUser($id: ID!, $name: String!, $description: String, $email: String!, $pwd: String) {
  updateUser(id: $id, data: {name: $name, description: $description, email: $email, pwd: $pwd}) {
    id
    name
    description
    email
  }
}

`

export const CREATE_TASK = gql`
  mutation createTask($name: String!, $statusId: ID!, $description: String!, $boardId: ID!, $userId: ID!) {
  createTask(data: { name: $name, statusId: $statusId, description: $description, boardId: $boardId, userId: $userId}) {
    name
    description
  }
}

`

export const UPDATE_TASK_BY_ID = gql`
mutation updateTask($id: ID!, $name: String!, $statusId: ID!, $description: String!, $boardId: ID!, $userId: ID!) {
  updateTask(id: $id, data: {name: $name, statusId: $statusId, description: $description, userId: $userId, boardId: $boardId}){
    id
    name
  }
}

`