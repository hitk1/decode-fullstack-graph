import crypto from 'crypto'
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user";


@Resolver()
export class UserResolver {
    private data: User[] = []

    //Necessario incluir as notations das queries e das mutations respectivas pra criação dos schemas
    @Query(() => String)
    async hello() {
        return 'Hello world'
    }

    @Query(() => [User])
    async user() {
        return this.data
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string,
    ) {
        const user = {
            id: crypto.randomUUID(),
            name
        }

        this.data.push(user)

        return user
    }
}