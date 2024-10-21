/* nextJs does not use frontfile only for authentication, it also uses nextjs api end points backend as well */
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:'',
            clientSecret:'',
        })
    ],
    async session({session}){

    },
    async signIn({profile}){

    }
}) //{}: this is know as option object in which we provide named paramter 