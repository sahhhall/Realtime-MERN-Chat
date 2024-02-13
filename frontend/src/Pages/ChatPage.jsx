import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChatProvider, { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/sideDrawer';
import UserChats from '../components/miscellaneous/UserChats';
import ChatArea from '../components/miscellaneous/ChatArea'
import Notifications from '../components/ui/Notifications';
const ChatPage = () => {
     const { user, notification } = ChatState();
     const [ fetchAgain, setFetchAgain ] = useState(false)
    
    return(
        <div style={{width:'100%',position:'relative'}}  >
            {user&& <SideDrawer/>}
            <Box
          display='flex'
       
          flexGrow={1} // This will make the container grow to take up remaining space
          width='100%'
          minHeight={0} 
            >     
                 {user && <Notifications  notification={notification} />}
                 {user && <UserChats fetchAgain={fetchAgain}  style={{ width: '50%' }} />} 
                 {user && <ChatArea  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} style={{  width: '50%' }}/>} 
            </Box>
        </div>
    )
}

export default ChatPage