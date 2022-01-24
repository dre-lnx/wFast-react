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
