import {
    AppBar,
    Avatar,
    Box,
    Breadcrumbs,
    Divider,
    IconButton,
    Link,
    LinkProps,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React, { useMemo, useState } from 'react';
import {
    Link as RouterLink, useLocation, useNavigate,
} from 'react-router-dom';

import HandleScroll from '../handlers/HandleScroll.ts';
import { Route, routes } from '../routes/routes.tsx';

interface ToolbarProps {
    drawerWidth: number;
    isSmallScreen: boolean;
    showOpenDrawer: boolean;
    updateDrawer: () => void;
    changeMode: () => void;
}

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
    return <Link { ...props } component={ RouterLink }/>;
}

function HeaderBar(props: ToolbarProps) {

    const theme = useTheme();

    const navigate = useNavigate();

    const {drawerWidth, isSmallScreen, showOpenDrawer, updateDrawer, changeMode} = props;

    const [isScrolled, setIsScrolled] = useState(false);
    const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);

    const routesMap = useMemo(() => {
        const routesMap = new Map<string, string>();
        routes.forEach((route: Route) => {
            routesMap.set(route.path, route.name);
        });
        return routesMap;
    }, []);

    HandleScroll({
        callback: () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        }
    });

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuEl(null);
    };

    const handleLogout = () => {
        handleClose();
        navigate('/login');
    }

    const isMenuOpen = Boolean(menuEl);

    const location = useLocation();

    const pathNames = location.pathname.split('/').filter((x) => x);

    return (
        <AppBar
            component="nav"
            position="fixed"
            sx={ {
                borderRadius: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
                opacity: isScrolled ? 0.85 : 1,
                zIndex: theme.zIndex.appBar + 1,
                width: `calc(100% - ${ !isSmallScreen
                    ? `(${ drawerWidth }px + ${ theme.spacing(2) } * 3)`
                    : `${ theme.spacing(2) } * 2` } )`,
                margin: theme.spacing(2),
            } }
        >
            <Toolbar sx={ {justifyContent: 'space-between'} }>
                <Typography variant="h6" noWrap component="div" sx={ {
                    color: theme.palette.text.primary
                } }>
                    Fuel Manager
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <LinkRouter underline="hover" color="inherit" to="/">
                        Home
                    </LinkRouter>
                    {
                        // @ts-ignore
                        pathNames.map((value, index) => {
                        const last = index === pathNames.length - 1;
                        const to = `/${ pathNames.slice(0, index + 1).join('/') }`;
                        return last ? (
                            <Typography color="text.primary" key={ to }>
                                { routesMap.get(to) }
                            </Typography>
                        ) : (
                            <LinkRouter underline="hover" color="inherit" to={ to } key={ to }>
                                { routesMap.get(to) }
                            </LinkRouter>
                        );
                    }) }
                </Breadcrumbs>
                <Box component="div">
                    { isSmallScreen &&
                        <IconButton
                            size="large"
                            onClick={ updateDrawer }
                            color="inherit"
                        >
                            { showOpenDrawer ? <MenuIcon/> : <MenuOpenIcon/> }
                        </IconButton>
                    }
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ handleMenu }
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        anchorEl={ menuEl }
                        id="account-menu"
                        open={ isMenuOpen }
                        onClose={ handleClose }
                        onClick={ handleClose }
                        slotProps={ {
                            paper:
                                {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            backgroundColor: theme.palette.background.paper,
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }
                        } }
                        transformOrigin={ {horizontal: 'right', vertical: 'top'} }
                        anchorOrigin={ {horizontal: 'right', vertical: 'bottom'} }
                    >
                        <MenuItem onClick={ handleClose }>
                            <Avatar/> My account
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={ handleClose }>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={ changeMode }>
                            <ListItemIcon>
                                { theme.palette.mode === 'dark'
                                    ? <Brightness7Icon fontSize="small"/>
                                    : <Brightness4Icon fontSize="small"/> }
                            </ListItemIcon>
                            { theme.palette.mode !== 'dark' ? 'Dark Mode' : 'Light Mode' }
                        </MenuItem>
                        <MenuItem onClick={ handleLogout }>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderBar;
