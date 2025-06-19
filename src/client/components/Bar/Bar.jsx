import { useRef } from 'react';
import './Bar.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Bar({handleSend}) {
    const inputRef = useRef(null);
    return ( 
    <div className='app-bar'>
        <FormControl>
            <TextField ref={inputRef} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={() => {inputRef.current != null ? handleSend(inputRef.current.getElementsByClassName("MuiInputBase-input")) : null}} variant="contained">Contained</Button>
        </FormControl>
    </div>);
}

export default Bar;