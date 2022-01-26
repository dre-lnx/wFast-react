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
