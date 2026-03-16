import { Metadata } from 'next'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
    title: 'Sign In | TE KAIRIRI MOTORS',
    description: 'Sign in to your TE KAIRIRI MOTORS account to access premium vehicle exports',
}

export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}
