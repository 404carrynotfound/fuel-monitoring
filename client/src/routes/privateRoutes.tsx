import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const auth = localStorage.getItem('token')
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
