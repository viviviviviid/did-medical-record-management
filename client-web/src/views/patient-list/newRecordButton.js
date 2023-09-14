import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function NewRecordButton(props) {
  const navigate = useNavigate();

  return (
      <Button variant="contained" 
              onClick={() => {navigate('/new-medical-record')}}
              sx={{marginTop:'9px', height:55, marginLeft:'9px'}}>신규 작성</Button>
  );
}