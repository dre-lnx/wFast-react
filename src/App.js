import * as React from 'react'
import './assets/App.css'
import AppRouter from './routes'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client'
import { AuthProvider } from './contexts/auth'

import { ErrorLink, onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`)
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/graphql' }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

function App() {
  return(
    <AuthProvider>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
