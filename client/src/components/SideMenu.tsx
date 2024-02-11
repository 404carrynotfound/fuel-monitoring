import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';

import { Route, routes } from '../routes/routes.tsx';
import { Link } from 'react-router-dom';

interface SideMenuProps {
    drawerWidth: number;
    isSmallScreen: boolean;
    showOpenDrawer: boolean;
    updateDrawer: () => void;
}

function SideMenu(props: SideMenuProps) {

    const theme = useTheme();

    const { drawerWidth, isSmallScreen, showOpenDrawer, updateDrawer } = props;

    return (
        <Drawer
            variant={ isSmallScreen ? 'temporary' : 'permanent' }
            anchor="left"
            open={ showOpenDrawer }
            onClose={ updateDrawer }
            sx={ {
                margin: theme.spacing(2),
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    margin: theme.spacing(2),
                    borderRadius: theme.spacing(2),
                    backgroundColor: '#3d3d3d',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    height: `calc(100% - ${ theme.spacing(2) } * 2)`,
                }
            } }
        >
            <List>
                { routes.map(({ name, path, icon }: Route) => (
                    <ListItem key={ name }>
                        <ListItemButton component={ Link } to={ path }>
                            { icon ? <ListItemIcon>{ icon }</ListItemIcon> : null }
                            <ListItemText primary={ name }/>
                        </ListItemButton>
                    </ListItem>
                )) }
            </List>
        </Drawer>
    );
}

export default SideMenu;
