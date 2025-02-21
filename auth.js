import NextAuth from "next-auth"
import dbConnect from "./dbConfig/dbConnect";
import userService from "./services/user.service";
import authConfig from "./auth.config";
import dbConnectFints from "./dbConfig/dbConnectFints";
const userInstance = new userService(); 

export const { handlers, signIn, signOut, auth } = NextAuth(
{
    callbacks:
    {
        async signIn({user, account})
        {
            if(account?.provider === 'google')
            {
                await dbConnectFints();
                try
                {
                    const { name, email, id } = user;

                    const isUserFound = await userInstance
                    .findByEmail(email);

                    if(!isUserFound)
                        await userInstance.googleAuth(name, email, id);

                    return true
                }
                catch(error)
                {
                    throw new Error(error.message)
                }
            }
            else if(account?.provider === 'credentials')
                return true

            return false
        },
        async jwt({token, user, trigger})
        {
            if(trigger === 'update')
            {
                await dbConnectFints();
                const isUserFound = await userInstance.findByEmail(token.email);
                token.role = isUserFound.role;
                return token
            }

            if(user)
            {
                await dbConnectFints();
                const isUserFound = await userInstance.findByEmail(token.email);
                if(!isUserFound)
                    token.role = 'visitor'
                else
                {
                    token.id = isUserFound._id
                    token.role = isUserFound.role
                }
            }
            return token
        },
        async session({token, session})
        {
            if(token?.id)
            {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
    session: 
    {
        strategy: 'jwt'
    },
    pages:
    {
        signIn: '/login',
        error: '/error'
    },
    ...authConfig,
})