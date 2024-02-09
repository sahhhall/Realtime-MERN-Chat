import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Avatar, Box, Image, Text } from '@chakra-ui/react'
import logo from '../assets/SAchat.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { selectedChat } = ChatState()
  return (
    <>
         {
            selectedChat ? (
                <></>
            ) : (
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
                <Text mt={'.5em'} color={'gray'} fontSize={'x-large'}>
                    SAChat for Windows
                </Text>
                <Text className='singlechat-text-ad' mt={'.2em'}>
                    Send and receive messages without keeping your phone online. <br />
                    Use SAchat on up to 4 linked devices and 1 phone at the same time
                </Text>
                <Box marginTop={'22%'} style={{color:'gray'}}>
                <FontAwesomeIcon icon={faUnlock}
                size='md'
                  style={{ color: '#c7c7c7' }}
                /> Click on a user to chat
                </Box>
               
            </Box>
            
            )
         } 
    </>
  )
}

export default SingleChat