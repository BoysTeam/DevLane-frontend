import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'



interface SignupPayload {
    username: string
    email: string
    password: string
}

interface LoginPayload {
    email: string
    password: string
}

interface AuthResponse {
    access_token: string
    user: {
        id: string
        username: string
        email: string
    }
}

interface SignupResponse {
    user: {
        id: string
        username: string
        email: string
    }
}

export function useSignUp() {
    return useMutation({
        mutationFn: (data: SignupPayload) =>
            api.post<SignupResponse>('auth/register', data).then((res) => res.data),

        onSuccess: () => {
            // User registered successfully, but no JWT is returned.
            // You can perform redirects or state updates here.
        },
        onError: (err) => console.log('sign-up failed', err)
    })

}


export function useLogin() {
    return useMutation({
        mutationFn: (data: LoginPayload) =>
            api.post<AuthResponse>('/auth/login', data).then((res) => res.data),
        onSuccess: (data) => {
            localStorage.setItem('jwt-token', data.access_token)
        },
        onError: (err) => console.log('sign-in failed', err)
    })
}
