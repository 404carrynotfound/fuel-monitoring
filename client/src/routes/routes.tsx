import { JSX } from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

export class Route {
    name: string = '';
    path: string = ''
    icon: JSX.Element = <ErrorIcon/>;

    constructor(route: Partial<Route>) {
        Object.assign(this, route);
    }
}

export const routes: Route[] = [
    new Route({
        name: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon/>
    }),
    new Route({
        name: 'Add Fuel',
        path: '/add-fuel',
        icon: <LocalGasStationIcon/>
    })
];


