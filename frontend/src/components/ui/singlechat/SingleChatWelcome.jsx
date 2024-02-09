import React from 'react'
import { Avatar, Box, Image, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
const SingleChatWelcome = ({ logo }) => {
  return (
   
         <Box
                width={'100%'}
                display={'flex'} 
                flexDirection={'column'} 
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
                my={'auto'}
                marginTop={'20%'}
               
            >
                <Image src={logo} style={{ margin: 'auto' }} /> 
                <Text mt={'.5em'} color={'gray'} letterSpacing={'6px'} fontSize={'large'}>
                    SAChat for Windows
                </Text>
                <Text className='singlechat-text-ad'fontSize={'small'} letterSpacing={'.3px'} mt={'.2em'}>
                    Send and receive messages without keeping your phone online. <br />
                    Use SAchat on up to 4 linked devices and 1 phone at the same time
                </Text>
                <Box marginTop={'22%'} style={{color:'gray'}}>
                <FontAwesomeIcon icon={faUnlock}
                
                  style={{ color: '#c7c7c7' }}
                  
                /> &nbsp;  Click on a user to chat
                </Box>
               
            </Box>
            
    
  )
}

export default SingleChatWelcome