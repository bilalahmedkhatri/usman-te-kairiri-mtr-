import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
    interface User {
        id: string
        email: string
        name: string | null
        role: string
        image: string | null
        siteId: number | null
    }

    interface Session {
        user: {
            id: string
            email: string
            name: string | null
            role: string
            image: string | null
            siteId: number | null
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
        siteId: number | null
    }
}
