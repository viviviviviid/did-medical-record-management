import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUpButton(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("SIGN_UP : ", props.name, props.email, props.birthday, props.phoneNumber, props.isDoctor);
        // axios.post('http://localhost:5001/user/signup', {
        //     name: props.name,
        //     email: props.email,
        //     birthday: props.birthday,
        //     phoneNumber: props.phoneNumber,
        //     isDoctor: props.isDoctor,
        // }) 

        navigate('/');
    }

  return (
      <Button variant="outlined"  
        sx={{width: '20vw'}}
        onClick={() => {
        handleClick();
      }}>가입</Button>
  );
}