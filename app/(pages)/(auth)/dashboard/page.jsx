import { PrivateRoute } from '@/app/components'
import React from 'react'

const Dashboard = () => {
    return (
        <PrivateRoute>
            <div>Dashboard - это приватный роут</div>
        </PrivateRoute>
    )
}

export default Dashboard