import { Metadata } from 'next'
import AuthLayout from '@/components/auth/AuthLayout'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
    title: 'Create Account | Hokira International',
    description: 'Create your Hokira International account to start exploring premium Japanese vehicles',
}

export default function RegisterPage() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}
