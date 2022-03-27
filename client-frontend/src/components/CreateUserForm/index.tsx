import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { GET_USER } from "../../App"
import { client } from "../../lib/apollo"

const CREATE_USER = gql`
    mutation ($name: String!) { #Os nomes dos parametros, precisam iniciarl com o sifrao '$'
        createUser(name: $name) {
            id,
            name
        }
    }
`

export const CreateUserForm = () => {
    const [name, setName] = useState<string>()
    const [createUser] = useMutation(CREATE_USER)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!name)
            return

        await createUser({
            variables: {
                name
            },
            update: (cache, { data: { createUser } }) => {
                //Busca todos os resultados da query informada por parametro
                const { user } = client.readQuery({ query: GET_USER })

                /*
                    Atualiza o cache dos dados da respectiva query, 
                    sem ter a necessidade de fazer uma nova à api.
                */
                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        user: [
                            ...user,
                            createUser
                        ]
                    }
                })
            }
            // refetchQueries: [GET_USER],  --> Esta opção faz que assim que chamada atual finalizar, que as queries passados por parametro no array sejam refeitas novamente
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}