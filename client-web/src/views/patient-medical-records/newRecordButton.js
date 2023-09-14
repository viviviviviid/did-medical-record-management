import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function NewRecordButton(props) {
  const navigate = useNavigate();
  const name = new URL(document.location.toString()).searchParams.get("patient");

  return (
      <Button variant="contained" 
              onClick={() => {navigate(`/new-medical-record?patient=${name}`)}}
              sx={{marginTop:'9px', height:55, marginLeft:'9px'}}>신규 작성</Button>
  );
}