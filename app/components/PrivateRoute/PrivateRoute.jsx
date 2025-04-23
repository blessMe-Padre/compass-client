'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('tokendgvSDfghsdghdrhgzdfrh');

        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
};

export default PrivateRoute;