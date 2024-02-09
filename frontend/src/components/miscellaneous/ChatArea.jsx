import { Box } from '@chakra-ui/react';
import { useMediaQuery } from '@uidotdev/usehooks';
import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import SingleChat from '../SingleChat';

const  ChatArea = ({fetchAgain, setFetchAgain}) => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const { user, selectedChat, setSelectedChat, chat, setChats } = ChatState();
    return(
        <Box style={{ display: selectedChat && isSmallDevice?'block':'none'}} className='chat-area'
        alignItems={'center'}
        flexDir={'column'}
        width={'100%'}
        display={'flex'}
        borderLeft={'4px outset #f3f3f3'}
        >
          
          <SingleChat   fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />
        </Box>
    )
}

export default ChatArea