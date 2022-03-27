import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { CreateUserForm } from './components/CreateUserForm'

type User = {
  id: string
  name: string
}

export const GET_USER = gql`
  query {
    user {
      id
      name
    }
  }
`

const App: React.FC = () => {
  const { data, loading } = useQuery<{ user: User[] }>(GET_USER)

  if (loading)
    return <p>Carregando usuarios...</p>

  return (
    <div>
      <ul>
        {data?.user.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <CreateUserForm />
    </div>
  )
}

export default App