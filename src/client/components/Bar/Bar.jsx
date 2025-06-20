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
            <Box sx={{pr: {xs: '0px', sm: '0px', md: '16px'}, pb: {xs: '8px', sm: '8px', md: '0px'}}} className="app-input"><TextField className='app-input-control' ref={inputRef} id="outlined-basic" label="Type a Message" color="primary" variant="outlined" /></Box>
            <Box className="app-options"><Button className='app-options-send-opt' onClick={() => { emitMessage()}} color="primary" variant="contained">Send</Button></Box>
        </FormControl>
    </Box>);
}

export default Bar;