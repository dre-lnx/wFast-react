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
