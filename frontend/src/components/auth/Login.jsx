import React, { useState } from 'react';
import { VStack, FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import validateField from '../../utils/validationPatterns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });
  const [ showPassword, setShowPassword ] = useState(false);
  const [ loading, setLoading ] = useState(false)
  const [ validationErr , setErr ] = useState({})
  const navigate = useNavigate();
 
  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const submitHandler = async() => {

    const validateErrors = {}
    if( !formData.mail.trim()) {
      validateErrors.mail = "E-mail is required"
    }else if (!validateField('mail', formData.mail)) {
      validateErrors.mail = "Not a valid Mail";
    }
    if(!formData.password){
      validateErrors.password = "password required";
    }
    setErr(validateErrors)
    if(Object.keys(validateErrors).length === 0 ){
      setLoading(true)
      try{
        const config = {
          headers : {
            "Content-type" : "application/json"
          }
        }
        const { data } = await axios.post("http://localhost:4001/api/user/login",{
          mail: formData.mail,
          password: formData.password
        },config)
      
        localStorage.setItem('userDetails' , JSON.stringify(data))
        const getUsername = JSON.parse(localStorage.getItem('userDetails'))
        setLoading(false)
        toast.success(`Welcome back ${getUsername.name}!!!`, {
        
           icon: '👏' ,duration: 3000
        });
        navigate('/chat')
        
      }catch(error){
        toast.error(`${error.response.data.message}`)
        setLoading(false)
      }
    }else{
      setTimeout(() => {
        setErr({})
      },3000)    
    }
    return
  }
 
  return (
    <VStack spacing={3}>
      <FormControl isRequired id='maill'>
        <Input
          borderColor='black.100'
          className='input-fields'
          name='mail'
          placeholder='Enter Your mail'
          onChange={handleChange}
          value={formData.mail}
          type='text'
        />
        {validationErr.mail && <span className='span--err'>{validationErr.mail}</span> }
      </FormControl>

      <FormControl isRequired id='passwordd'>
        <InputGroup>
          <Input
            borderColor='black.100'
            className='input-fields'
            name='password'
            placeholder='Enter Your password'
            onChange={handleChange}
            value={formData.password}
            type={showPassword ? 'text' : 'password'}
          />
          <InputRightElement width='4.5rem'>
            <Button background='white' h='1.15rem' size='sm' onClick={handleTogglePassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        { validationErr.password && <span className='span--err'>{validationErr.password}</span> }
      </FormControl>
      
      <Button 
       width={'100%'}
       style={{ background: 'rgb(25, 118, 210)', color: 'white' }}
       onClick={submitHandler}
       isLoading={loading}
       >
        Log in
      </Button>
      <div style={{ display: 'flex', alignItems: 'center',width:'100%' }}>
      <hr style={{ flex: '1', border: '.7px solid gray' }} />
      <p style={{ margin: '0 10px', color: 'black' , fontSize:'10px' }}>OR</p>
      <hr style={{ flex: '1', border: '.1px solid gray' }} />
    </div>
      <p className='guest-tag'
        style={{ color: 'black' }}
      
      >
        Guest User?<span className='span-guest'   onClick={() => {
          setFormData({ mail: 'guest@gmail.com', password: '123456' });
        }}> click here </span>
      </p>
     
    </VStack>
  );
};

export default Login;
