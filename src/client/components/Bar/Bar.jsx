import { useRef } from 'react';
import './Bar.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Bar({handleSend}) {
    const inputRef = useRef(null);

    const emitMessage = () => {
        if(inputRef.current != null) {
            handleSend(inputRef.current.getElementsByClassName("MuiInputBase-input"));
        } 
    }

    return ( 
    <Box className='app-bar'>
        <FormControl className='app-form'>
            <Box className="app-input" sx={{ p: 2 }}><TextField className='app-input-control' ref={inputRef} id="outlined-basic" label="Outlined" variant="outlined" /></Box>
            <Box className="app-options" sx={{ p: 2 }}><Button className='app-options-send-opt' onClick={() => { emitMessage()}} color="primary" variant="contained">Send</Button></Box>
        </FormControl>
    </Box>);
}

export default Bar;