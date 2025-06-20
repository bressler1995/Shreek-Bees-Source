import Box from '@mui/material/Box';
import "./Canvas.css";

function Canvas({children}) {
    return ( 
        <Box className='app-canvas'>
            {children}
        </Box>
     );
}

export default Canvas;