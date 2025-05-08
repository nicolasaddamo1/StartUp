/*************  ✨ Windsurf Command ⭐  *************/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export const useOauth = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            router.push('/');
        }
    }, [router]);

    const login = async (provider: string, data: { email: string; password: string }) => {
        try {
            const res = await fetch(`/api/oauth/${provider}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                const user = (await res.json()) as User;
                setUser(user);
                localStorage.setItem('token', user.id);
                router.push('/');
            } else {
                const error = (await res.json()) as { message: string };
                setError(error.message);
            }
        } catch (error) {
            setError('Error al intentar autenticar');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return {
        user,
        error,
        login,
        logout,
    };
};
/*******  6f606661-b02f-407e-b5c1-edd02b4d5ea7  *******/