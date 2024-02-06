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
            justifyContent='space-between'
            width='100%'
            h='94vh'
            > 
                 {user && <UserChats/>} 
                 {user && <ChatArea/>} 
            </Box>
        </div>
    )
}

export default ChatPage