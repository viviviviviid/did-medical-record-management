import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './signup.css';
import InputField from '../../modules/inputField';
import EmailSelect from './emailSelect';
import SignUpButton from './signupButton';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';

export default function Main() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [write, setWrite] = useState(false);
    const [Null, setNull] = useState("");
    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        if(domain === 'write')
            setWrite(true);
    }, [domain]);

    useEffect(() => {
        console.log("NULL : ", Null);
    }, [Null]);

    return(
        isLoading ?
            <div className='column-center signup-loading'>
                    <p>Loading</p>
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
                        <InputField 
                            id={Null === 'email' ? 'error' : ''}
                            type='text' 
                            label='이메일' 
                            width='9vw' 
                            setData={setEmail} />
                        <h3>@</h3>
                        { write ? 
                            <InputField 
                                type='text'
                                label='이메일'
                                width='9vw'
                                setData={setDomain} />  
                            :
                            <EmailSelect 
                            setEmail={setDomain} 
                            email={domain} />  
                        }
                        
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
                            control={<Checkbox onClick={() => {setIsDoctor(!isDoctor)}}/>} 
                            label="의사이신가요?" />
                    </div>
                    <div className='row-center'>
                        <SignUpButton
                            name={name}
                            email={email + "@" + domain} 
                            birthday={birthday}
                            phoneNumber={phoneNumber}
                            isDoctor={isDoctor}
                            setNull={setNull}
                            />
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </div>
        
    )
}