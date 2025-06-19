import { useRef } from 'react';
import './Bar.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Bar({handleSend}) {
    const inputRef = useRef(null);

    const emitMessage = () => {
        if(inputRef.current != null) {
            handleSend(inputRef.current.getElementsByClassName("MuiInputBase-input"));
        } 
    }

    return ( 
    <div className='app-bar'>
        <FormControl>
            <TextField ref={inputRef} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={() => { emitMessage()}} variant="contained">Contained</Button>
        </FormControl>
    </div>);
}

export default Bar;