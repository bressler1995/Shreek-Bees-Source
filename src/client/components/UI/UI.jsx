import Box from '@mui/material/Box';
import "./UI.css";

function UI({children}) {
    return ( 
        <Box className='app-ui'>
            {children}
        </Box>
    );
}

export default UI;