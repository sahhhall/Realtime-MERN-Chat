import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import { Avatar, Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { getChatEnderName, getProfileSender } from '../../config/chatHelpers';

export const ChatBoxHistory = () => {
  const [logged, setLogged] = useState(false);
  const { user, selectedChat, chat, setChats, setSelectedChat } = ChatState();

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
  }, []);

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
              onClick={() => handleClick(chatt)}
              cursor="pointer"
              bg={selectedChat === chatt ? "#38B2AC" : "#0000"}
              color={selectedChat === chatt ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
            >
              <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                src={!chatt.isGroupChat ? getProfileSender(user, chatt.users) : ''}
              />
              <Box>
                <Text>
                  {!chatt.isGroupChat ? getChatEnderName(user, chatt.users) : chatt.chatName}
                </Text>
              </Box>
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
