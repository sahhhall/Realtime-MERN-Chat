import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import { Box, Stack, Text } from '@chakra-ui/react'
import { getChatEnderName } from '../../config/chatHelpers'

export const ChatBoxHistory = () => {
  const [ logged , setLogged ] = useState()
  const {user, setUser, selectedChat, setSelectedChat, chat, setChats} = ChatState()
  const fetchChats = async() => {
    try{
      const config = {
       headers : {
           Authorization: `Bearer ${user.token}`
        }
      }
      const { data }  = await axios.get(`http://localhost:4001/api/chat`,config)
      setChats(data)
    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("userDetails")))
    
    fetchChats();
  },[])
  return (
    <div
    
      
      display={'flex'}
      cursor="pointer"
      ml={'6px'}
    pt={'8px'}p={'8px'}
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      
      color="black"
      >
        {chat.length>=1 ? (
          <Stack overflowY={'scroll'} sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         }>
            {chat.map((chatt)=>(
              <Box 
               onClick={() => setSelectedChat(chatt)}
              cursor="pointer"
              bg={selectedChat === chatt ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chatt ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chatt._id}>
              <Text>
                {!chatt.isGroupChat ? getChatEnderName(user,chatt.users):chatt.chatName}
              </Text>
              </Box>
            ))}

          </Stack>
        ):(
          <span>g</span>
        )}
     
    </div>
  )
}
