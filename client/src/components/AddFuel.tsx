import { Box, Button, styled, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormEvent } from 'react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AddFuel() {
    const theme = useTheme();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        console.log(formData.get('file'));
    }

    return (
        <Box component="form"
             onSubmit={ handleSubmit }
             sx={ {
                 flexGrow: 1,
                 height: `calc(100vh - ${ theme.spacing(14) })`,
             } }>

            <Button component="label" variant="contained" startIcon={ <CloudUploadIcon/> }>
                Upload file
                <VisuallyHiddenInput type="file"/>
            </Button>
            <Button type="submit" variant="contained" sx={ { mt: 3, mb: 2 } }>
                Save Fuel Report
            </Button>
        </Box>

    );
}

export default AddFuel;
