import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/actions';

export default function SignUpButton(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(setIsLoading(true));
    }, []);

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
                 console.log(res); 

                 dispatch(setIsLoading(false));
                 navigate('/');
              })

          

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