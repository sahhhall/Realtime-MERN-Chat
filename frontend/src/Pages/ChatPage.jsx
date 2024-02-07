import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/sideDrawer';
import UserChats from '../components/miscellaneous/UserChats';
import ChatArea from '../components/miscellaneous/ChatArea'
const ChatPage = () => {
     const { user } = ChatState();
    return(
        <div style={{width:'100%'}}>
            {user&& <SideDrawer/>}
            <Box
          display='flex'
          justifyContent={'space-between'}
          flexGrow={1} // This will make the container grow to take up remaining space
          width='100%'
          minHeight={0} 
            > 
                 {user && <UserChats style={{ width: '50%' }} />} 
                 {user && <ChatArea style={{ flex: '1', width: '50%' }}/>} 
            </Box>
        </div>
    )
}

export default ChatPage