import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './signup.css';
import InputField from '../../modules/inputField';
import SignUpButton from './signupButton';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function Main() {
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [write, setWrite] = useState(false);
    const [Null, setNull] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const email = useSelector(state => state.email);
    

    useEffect(() => {
        if(domain === 'write')
            setWrite(true);
    }, [domain]);

    return(
        isLoading ?
            <div className='column-center signup-loading'>
                    <p>JWT 생성 중</p>
                <Box sx={{ width: '60%' }}> 
                    <LinearProgress />
                </Box>
            </div>
            :
            <div className='root'>
            <Header />
            <div className='body column-center'>
                <div>
                    <p className='signup-title'>신규가입</p>
                </div>
                <div className='signup-input-container'>
                    <InputField 
                        id={Null === 'name' ? 'error' : ''}
                        type='text'
                        label='이름' 
                        width='20vw' 
                        setData={setName} />
                    <div className='row-center'>
                        <p className='signup-email'
                            style={{
                                color: '#666',
                                fontSize: '2vh'
                            }}>{email}</p>
                    </div>
                    <InputField 
                        id={Null === 'birthday' ? 'error' : ''}
                        type='text' 
                        label='출생일' 
                        width='20vw' 
                        setData={setBirthday} />
                    <p>YY/MM/DD 형식으로 입력해주세요</p>
                    <InputField 
                        id={Null === 'phoneNumber' ? 'error' : ''}
                        type='text' 
                        label='전화번호' 
                        width='20vw' 
                        setData={setPhoneNumber} />
                    <p>010-XXXX-XXXX 형식으로 입력해주세요</p>
                    <div className='row-center'>
                        <FormControlLabel 
                            control={
                                <Checkbox onClick={() => {
                                    setIsDoctor(!isDoctor)
                                }}/>} 
                            label="의사이신가요?" 
                        />
                    </div>
                    <div className='row-center'>
                        <SignUpButton
                            name={name}
                            birthday={birthday}
                            email={email}
                            phoneNumber={phoneNumber}
                            isDoctor={isDoctor}
                            setNull={setNull}
                            setIsLoading={setIsLoading}
                            />
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </div>
        
    )
}