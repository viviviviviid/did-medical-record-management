import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function InputField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setData(e.target.value)}}
      >
        <div>
          <TextField
            label={props.label}
            type={props.type}
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }