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
          name,
          email
        }
    }
  }
`
