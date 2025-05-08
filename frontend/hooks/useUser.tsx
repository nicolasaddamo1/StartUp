// Assuming the useUser hook is a TSX file based on the common structure of React hooks.
import { useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
}

function useUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user');
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        };

        fetchUser();
    }, []);

    return { user };
}

export default useUser;

