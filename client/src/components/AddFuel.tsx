import { Box, Button, styled, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormEvent, useState } from 'react';
import { addFuel } from '../service/FuelService.ts';

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
    const [file, setFile] = useState<FileList | null>(null);
    const [fuelType, setFuelType] = useState('');
    const [fuelCost, setFuelCost] = useState(0);
    const [fuelAmount, setFuelAmount] = useState(0);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(event)

        const form = new FormData();
        form.set('fuelType', fuelType);
        form.set('fuelCost', fuelCost.toString());
        form.set('fuelAmount', fuelAmount.toString());

        if (file) {
            form.set('file', file[0]);
        }
        const res = await addFuel(form);
        console.log(res)
    }

    return (
        <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Fuel Type"
                type="text"
                onChange={ e => setFuelType(e.target.value) }
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Fuel Costs"
                type="number"
                onChange={ e => setFuelCost(Number(e.target.value)) }
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Fuel Amount"
                type="number"
                onChange={ e => setFuelAmount(Number(e.target.value)) }
            />
            <Button component="label" fullWidth variant="contained" startIcon={ <CloudUploadIcon/> }>
                Upload file
                <VisuallyHiddenInput onChange={ event => setFile(event.target.files) } type="file"/>
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={ { mt: 3, mb: 2 } }
            >
                Save Fuel Report
            </Button>
        </Box>
    );
}

export default AddFuel;
