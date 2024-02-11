import { Alert, Box, Button, Snackbar, TextField, useTheme } from '@mui/material';
import { SearchParcel } from '../service/ParcelService.ts';
import React, { useRef } from 'react';

function Parcel() {
    const theme = useTheme();

    const inputRef = useRef(null);

    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState('');

    const sendValue = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        SearchParcel(inputRef.current.value).then((res) => {
            setOpen(true);
            setMessageInfo(res.status);
        });
    }

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
            } }>
            <TextField
                required
                label="Tracking Number"
                id="outlined-size-small"
                inputRef={ inputRef }
            />
            <Button sx={ {
                marginTop: theme.spacing(2)
            } } onClick={ sendValue } variant="contained">Search</Button>

            <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }
                      anchorOrigin={ { vertical: 'top', horizontal: 'center' } }>
                <Alert onClose={ handleClose } severity="info" sx={ { width: '100%' } }>
                    { messageInfo }
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Parcel;
