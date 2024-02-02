import React, { useState } from 'react';
import { FormControl, FormLabel, Input, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { color } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    password: '',
    confirmPass: '',
    picture: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  function submitHandler(){
    console.log(formData);
  }

  return (
    <VStack spacing={3}>
      <FormControl isRequired id='name'>
        
        <Input
          borderColor='black.100'
          className='input-fields'
          name='name'
          placeholder='Enter Your name'
          onChange={handleChange}
          value={formData.name}
          type='text'
        />
      </FormControl>

      <FormControl isRequired  id='mail'>
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

      <FormControl isRequired   id='password'>
        <InputGroup>
          <Input
            borderColor='black.100'
            className='input-fields'
          
            name='password'
            placeholder='Enter Your password'
            onChange={handleChange}
            value={formData.password}
            type= {showPassword ? 'text' : 'password' } 
          />
          <InputRightElement width='4.5rem'>
            <Button  background='white' h='1.15rem' size='sm' onClick={handleTogglePassword}>
            {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired  id='confirmPass'>
        <InputGroup>
          <Input
            borderColor='black.100'
            className='input-fields'
            name='confirmPass'
            placeholder='confirm password'
            onChange={handleChange}
            value={ formData.confirmPass}
            type= { showConfirmPassword ? 'text' : 'password' } 
          />
          <InputRightElement width='4.5rem'>
            <Button  background='white' h='1.15rem' size='sm' onClick={handleToggleConfirmPassword}>
            {showConfirmPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic'>
       <Input
          borderColor='black.100'
          className='input-fields'
          name='picture'
          type='file'
          accept='image/*'
          size='xs'
          
        />
      </FormControl>
      
      <Button mt='3px' width={'100%'} style={{background:'rgb(25, 118, 210)',color:'white'}} onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
