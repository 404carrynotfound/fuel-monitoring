import {
    Box,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';

import useScreenChangeEffect from './handlers/HandleScreenSize.ts';
import HeaderBar from './components/HeaderBar.tsx';
import SideMenu from './components/SideMenu.tsx';
import useDefaultTheme from './themes/DefaultTheme.ts';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AddFuel from './components/AddFuel.tsx';
import Dashboard from './components/Dashboard.tsx';
import Parcel from './components/Parcel.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import PrivateRoutes from './routes/privateRoutes.tsx';

const drawerWidth = 240;

function App() {

    const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(useMediaQuery('(prefers-color-scheme: dark)'));

    const theme = useDefaultTheme({ prefersDarkMode });

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [showOpenDrawer, setShowOpenDrawer] = useState(false);

    const location = useLocation();


    useScreenChangeEffect(isSmallScreen, (isSmall) => {
        if (!isSmall) {
            setShowOpenDrawer(false)
        }
    });

    const changeMode = () => {
        setPrefersDarkMode(!prefersDarkMode);
    };

    const updateDrawer = () => {
        setShowOpenDrawer(!showOpenDrawer);
    };

    return (
        <ThemeProvider theme={ theme }>
            <Box sx={ { display: 'flex' } }>
                <CssBaseline/>
                { location.pathname !== '/login' && location.pathname !== '/register' &&
                    <>
                        <HeaderBar
                            drawerWidth={ drawerWidth }
                            isSmallScreen={ isSmallScreen }
                            showOpenDrawer={ showOpenDrawer }
                            updateDrawer={ updateDrawer }
                            changeMode={ changeMode }
                        />

                        <SideMenu
                            drawerWidth={ drawerWidth }
                            isSmallScreen={ isSmallScreen }
                            showOpenDrawer={ showOpenDrawer }
                            updateDrawer={ updateDrawer }
                        />
                    </>
                }
                <Box component="main"
                     sx={ {
                         flexGrow: 1,
                         marginTop: theme.spacing(12),
                         marginLeft: isSmallScreen ? theme.spacing(2) : 0,
                         marginRight: theme.spacing(2),
                     } }
                >
                    <Routes>
                        <Route element={ <PrivateRoutes/> }>
                            <Route path="/" element={ <Navigate to="/dashboard"/> }/>
                            <Route path="/dashboard" element={ <Dashboard/> }/>
                            <Route path="/add-fuel" element={ <AddFuel/> }/>
                            <Route path="/parcel" element={ <Parcel/> }/>
                        </Route>

                        <Route path="/login" element={ <Login/> }/>
                        <Route path="/register" element={ <Register/> }/>
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
