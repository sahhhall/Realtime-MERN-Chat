import React, { useState } from 'react';
import { FormControl, FormLabel, Input, VStack, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import axios, { Axios } from 'axios';
import fileUpload from '../../services/cloudinaryFileUploader';
import { useNavigate } from 'react-router-dom'
import validateField from '../../utils/validationPatterns';

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
  const [ loading, setLoading ] = useState(null)
  const [ focus, setFocus ] = useState({
    errName : false,
    errMail : false,
    errPassword : false,
    errConfirm : false
  })
  const [ validationErr, setErr ] = useState({})
  const navigate = useNavigate();
  // for toasting 
  const toast = useToast()
  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleFileUpload = async (selectedPicture) => {
    setLoading(true);

    if (!selectedPicture) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      if ( selectedPicture.type === "image/jpeg" || selectedPicture.type === "image/png" || selectedPicture.type === "image/jpg" ) {
      
        await fileUpload(selectedPicture)
      .then((data) => {
          setFormData((prevFormData) => ({
              ...prevFormData,
              picture: data.url.toString(),
          }));
          setLoading(false);
      });}
      else {
        
      toast({
        title: `please select jpg/png `,
        status: `error`,
        isClosable: true,
        duration:3000,
        position:'top-right'
      })
      setLoading(false)
      return;
      }
  
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error uploading image',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top-right',
      });
    
    }
  };


  const handleSubmit = async() => {    
   
    const validateErrors = {}
        if ( !formData.name.trim() ) {
      validateErrors.name = "username is required"
    }
    
    if( !formData.mail.trim()) {
      validateErrors.mail = "E-mail is required"
    }else if (!validateField('mail', formData.mail)) {
      validateErrors.mail = "Email not valid";
    }
    
    if( !formData.password.trim()) {
      validateErrors.password = "password is required"
    }else if ( !validateField('password', formData.password)  ){
      validateErrors.password =  "Password must be Strong"
    }

    if ( formData.confirmPass !== formData.password ) {
      validateErrors.confirmpassword = "password should be same"
    }
    setErr(validateErrors)
    if(Object.keys(validateErrors).length === 0 ) {
      setLoading(true)
      try{
        const config = {
          headers : {
            "Content-type" : "application/json"

          },
        };
        console.log({ name: formData.name, mail: formData.mail, password: formData.password, picture: formData.picture });

        const { data } = await axios.post("http://localhost:4001/api/user",{ 
          name: formData.name,
           mail: formData.mail,
          password: formData.password,
           picture: formData.picture },config)
      
        toast({
          title: 'registration success',
          status: 'success',
          isClosable: true,
          duration: 3000,
          position: 'top-right',
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))
        setLoading(false)
        navigate('/chat')
      }catch(err){
        toast({
          title: 'Error occured',
          description: err.message,
          status: 'error',
          isClosable: true,
          duration: 3000,
          position: 'top-right',
        })
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
      <FormControl  id='name'>
        
        <Input
          borderColor='black.100'
          className='input-fields'
          name='name'
          placeholder='Enter Your name'
          onChange={handleChange}
          value={formData.name}
          type='text'
          pattern='^[a-zA-Z0-9]{3,10}$'
          onBlur={() => setFocus({...focus , errName : true })}
          focus={focus.errName.toString()}
          required
        />
        <span className='span-validtion-err'>username 3-10 letters only </span>
        {validationErr.name &&  <span className='span--err'> {validationErr.name}</span> }
      </FormControl>

      <FormControl isRequired  id='mail'>
        <Input
          borderColor='black.100'
          className='input-fields'
          name='mail'
          placeholder='Enter Your mail'
          onChange={handleChange}
          value={formData.mail}
          type='email'
          
          onBlur={() => setFocus({...focus , errMail : true })}
          focus={focus.errMail.toString()}
          
        />
        <span className='span-validtion-err'>invalid mail</span>
        {validationErr.mail &&  <span className='span--err'> {validationErr.mail}</span> }
      </FormControl>

      <FormControl    id='password'>
        <InputGroup>
          <Input
            borderColor='black.100'
            className='input-fields'
            name='password'
            placeholder='Enter Your password'
            onChange={handleChange}
            value={formData.password}
            type= {showPassword ? 'text' : 'password' } 
            onBlur={() => setFocus({...focus , errPassword : true })}
            focus={focus.errPassword.toString()}
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$'
            required
            
          />
          <InputRightElement width='4.5rem'>
            <Button  background='white' h='1.15rem' size='sm' onClick={handleTogglePassword}>
            {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement> 
        </InputGroup>
        <span className='span-validtion-err'> Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.</span>
        {validationErr.password &&  <span className='span--err'> {validationErr.password}</span> }
      </FormControl>
      <FormControl  isRequired id='confirmPass'>
        <InputGroup >
          <Input
            borderColor='black.100'
            className='input-fields'
            name='confirmPass'
            placeholder='confirm password'
            onChange={handleChange}
            value={ formData.confirmPass}
            type= { showConfirmPassword ? 'text' : 'password' }
            onBlur={() => setFocus({...focus , errConfirm : true })}
            focus={focus.errConfirm.toString()} 
          />
          <InputRightElement width='4.5rem'>
            <Button  background='white' h='1.15rem' size='sm' onClick={handleToggleConfirmPassword}>
            {showConfirmPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {validationErr.confirmpassword && ( <>
          {validationErr.password ? '' : <span className='span--err'>{validationErr.confirmpassword}</span>} 
        </> )}
      </FormControl>
      <FormControl id='pic'>
       <Input
          borderColor='black.100'
          className='input-fields'
          name='picture'
          type='file'
          accept='image/*'
          size='xs'
          onChange={ (event) => handleFileUpload(event.target.files[0]) }
        />
      </FormControl>
      
      <Button 
         mt='3px' 
         width={'100%'} 
         style={{background:'rgb(25, 118, 210)',color:'white'}} 
         onClick={handleSubmit} 
         isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
