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
  mutation UpdateUser($id: ID!, $name: String!, $description: String, $email: String!, $pwd: String!) {
  updateUser(id: $id, data: {name: $name, description: $description, email: $email, pwd: $pwd}) {
    id
    name
    description
    email
  }
}

`