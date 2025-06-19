import useRef from 'react';
import './Bar.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Bar({handleSend}) {
    return ( 
    <div className='app-bar'>
        <FormControl>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={() => {handleSend("Message")}} variant="contained">Contained</Button>
        </FormControl>
    </div>);
}

export default Bar;