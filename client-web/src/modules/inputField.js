import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function InputField(props) {

    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: props.width},
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setData(e.target.value)}}
      >
        <div>
          {props.id === 'error' ?
            <TextField
            error
            label={props.label}
            type={props.type}
            autoComplete="current-password"
            helperText='필수입력사항'
            />
            :
            <TextField
              label={props.label}
              type={props.type}
              autoComplete="current-password"
            />
          }
          
        </div>
      </Box>
    );
  }

