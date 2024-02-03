import React, { useState } from 'react';
import { VStack, FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

const Login = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });
  const [ showPassword, setShowPassword ] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleTogglePassword = () => setShowPassword(!showPassword);

  function submitHandler() {
    console.log(formData);
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
      </FormControl>
      
      <Button width={'100%'} style={{ background: 'rgb(25, 118, 210)', color: 'white' }} onClick={submitHandler}>
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
