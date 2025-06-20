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
            <Box className="app-input" sx={{ pl: 2, pr: 1 }}><TextField className='app-input-control' ref={inputRef} id="outlined-basic" label="Type a Message" color="primary" variant="outlined" /></Box>
            <Box className="app-options" sx={{ pl: 1, pr: 2 }}><Button className='app-options-send-opt' onClick={() => { emitMessage()}} color="primary" variant="contained">Send</Button></Box>
        </FormControl>
    </Box>);
}

export default Bar;