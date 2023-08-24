import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUpButton(props) {
    const navigate = useNavigate();

    const handleClick = () => {

        if(!props.name)
          props.setNull('name');
        else if(props.email === '@')
          props.setNull('email');
        else if(!props.birthday)
          props.setNull('birthday');
        else if(!props.phoneNumber)
          props.setNull('phoneNumber');
        else if(!props.isDoctor)
          props.setNull('isDoctor');

        else {
            const userInfo = {
              name: props.name,
              email: props.email,
              birthday: props.birthday,
              phoneNumber: props.phoneNumber,
              isDoctor: props.isDoctor
            }
            axios.post('http://localhost:5001/user/signup', userInfo)
              .then(res => {
                 console.log(res); // 이게 도착을 할 때까지 페이지 안 벗어나게 하면서 로딩 창 팝업 띄워놔야함. // 블록체인 속도 때문에
              })

          navigate('/');

        }
    }

  return (
      <Button variant="outlined"  
        sx={{width: '20vw'}}
        onClick={() => {
        handleClick();
      }}>가입</Button>
  );
}