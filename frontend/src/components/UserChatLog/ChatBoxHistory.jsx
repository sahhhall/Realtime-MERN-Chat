import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import { Avatar, Box, Circle, Spinner, Stack, Text } from '@chakra-ui/react';
import {  getByID, getChatEnderName, getLatestMsglength, getProfileSender } from '../../config/chatHelpers';

export const ChatBoxHistory = ({ fetchAgain }) => {
  const [logged, setLogged] = useState(false);
  const { user, selectedChat, chat, setChats, setSelectedChat, latestMessages, messages } = ChatState();

  const latestMsgs = latestMessages;
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`http://localhost:4001/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem('userDetails')));
    fetchChats();
  }, [fetchAgain]);

  const handleClick = (chatt) => {
    selectedChat === chatt ? setSelectedChat(null) : setSelectedChat(chatt);
  };

  return (
    <div>
      {chat.length >= 1 ? (
        <Stack overflowY={'scroll'} sx={{
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
          {chat.map((chatt) => (
            <Box
              key={chatt._id}
              display={'flex'}
              position="relative"
              onClick={() => handleClick(chatt)}
              cursor="pointer"
              bg={selectedChat === chatt ? "#E0E0E0" : "#0000"}
              color={selectedChat === chatt ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              className='chats-history-box'
            >
              <Avatar
                mr={2}
                cursor="pointer"
                src={!chatt.isGroupChat ? getProfileSender(user, chatt.users) : ''}
              />
              <Box>
                <Text className='text-chat-log' >
                  {!chatt.isGroupChat ? getChatEnderName(user, chatt.users) : chatt.chatName}
                </Text>
                <Box>
                  {getByID(latestMsgs, chatt._id) || 'jghjg'}
                </Box>
              </Box>
            {latestMessages && getByID(latestMsgs, chatt._id) && getByID(latestMsgs, chatt._id).length >= 1 &&  <Box  position="absolute" right="10px"  top={'25%'} >
                <Circle size="30px" bg="green.500" color="white" textAlign="center">
                  <Text>{getLatestMsglength(latestMsgs, chatt._id)}</Text>
                </Circle>
              </Box>}
            </Box>

          ))}

        </Stack>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={'50%'}>
          <Spinner size="xl" />
        </Box>
      )}
    </div>
  );
};
