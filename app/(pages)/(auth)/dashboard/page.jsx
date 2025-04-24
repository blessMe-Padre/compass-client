'use client'
import { useEffect, useState } from 'react';
import getUserById from '@/app/utils/getUserById';
import { UserForm } from '@/app/components';

// const documentId = 'f9bh8d19a9ij1gg5zegvposx';
const documentId = 'bxgol3fvr7ei2e5522yrqpp6';

const Dashboard = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getUserById(documentId);
                setUser(response[0]);

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);

    return (
        <section>
            <div className="container">
                <h1>Здравствуйте, {user?.username}</h1>
                <UserForm user={user} />
            </div>
        </section>
    )
}

export default Dashboard