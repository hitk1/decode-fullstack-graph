import 'reflect-metadata'

import path from 'path'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from './src/resolvers/UserResolver'

(async () => {

    const schema = await buildSchema({
        resolvers: [
            UserResolver
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')   //Indica onde será salvo o arquivos de schemas do graphql
    })

    const server = new ApolloServer({
        schema
    })

    const { url } = await server.listen()

    console.log(`Server running on ${url}`)
})()