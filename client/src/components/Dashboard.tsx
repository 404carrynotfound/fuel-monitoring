import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from 'react';
import { getDaily } from '../service/FuelService.ts';
import { getYearly } from '../service/FuelService.ts';
import { getMonthly } from '../service/FuelService.ts';
import { getCurrency } from '../service/CurrencyService.ts';


function Dashboard() {

    const theme = useTheme();

    const [dailyCost, setDailyCost] = useState(0);
    const [monthlyCost, setMonthlyCost] = useState(0);
    const [yearlyCost, setYearlyCost] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);

    useEffect(() => {
        Promise.all([getDaily(), getYearly(), getMonthly(), getCurrency('EUR')]).then(([daily, yearly, monthly, curr]) => {
            console.log(daily.total)
            setDailyCost(daily.total);
            setYearlyCost(yearly.total);
            setMonthlyCost(monthly.total);
            setCurrencyRate(curr.rates['USD'])
        });
    }, []);

    return (
        <Box sx={ {
            borderRadius: theme.spacing(2),
            padding: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
        } }>
            <Card sx={ {
                margin: theme.spacing(2),
            } }>
                <CardHeader
                    titleTypographyProps={ { variant: 'h6' } }
                    avatar={
                        <LocalGasStationIcon fontSize="large"/>
                    }
                    title="Daily fuel cost"
                />
                <Divider/>
                <CardContent
                    sx={ {
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap'
                    } }>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <EuroIcon fontSize="large"/>
                            }
                            title={ dailyCost }
                        />
                    </Card>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <AttachMoneyIcon fontSize="large"/>
                            }
                            title={ (dailyCost * currencyRate).toFixed(2) }
                        />
                    </Card>
                </CardContent>
            </Card>
            <Card sx={ {
                margin: theme.spacing(2),
            } }>
                <CardHeader
                    titleTypographyProps={ { variant: 'h6' } }
                    avatar={
                        <LocalGasStationIcon fontSize="large"/>
                    }
                    title="Yearly fuel cost"
                />
                <Divider/>
                <CardContent
                    sx={ {
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap'
                    } }>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <EuroIcon fontSize="large"/>
                            }
                            title={ yearlyCost }
                        />
                    </Card>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <AttachMoneyIcon fontSize="large"/>
                            }
                            title={ (yearlyCost * currencyRate).toFixed(2) }
                        />
                    </Card>
                </CardContent>
            </Card>
            <Card sx={ {
                margin: theme.spacing(2),
            } }>
                <CardHeader
                    titleTypographyProps={ { variant: 'h6' } }
                    avatar={
                        <LocalGasStationIcon fontSize="large"/>
                    }
                    title="Monthy fuel cost"
                />
                <Divider/>
                <CardContent
                    sx={ {
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap'
                    } }>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <EuroIcon fontSize="large"/>
                            }
                            title={ monthlyCost }
                        />
                    </Card>

                    <Card sx={ {
                        backgroundColor: 'green',
                        borderRadius: theme.spacing(2),
                        margin: theme.spacing(2),
                    } }>
                        <CardHeader
                            titleTypographyProps={ { variant: 'h6' } }
                            avatar={
                                <AttachMoneyIcon fontSize="large"/>
                            }
                            title={ (monthlyCost * currencyRate).toFixed(2) }
                        />
                    </Card>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Dashboard;
