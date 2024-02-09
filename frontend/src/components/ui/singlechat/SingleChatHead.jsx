import React from 'react';
import { Box, Text, Avatar, List, ListItem, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { faArrowLeft, faEllipsisVertical, faMagnifyingGlass, faPhone, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChatEnderName, getProfileSender } from '../../../config/chatHelpers';
import { ChatState } from '../../../context/ChatProvider';
import ProfileViewModal from '../../miscellaneous/ProfileViewModal';

const SingleChatHead = ({ selectedChat, setSelectedChat }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
  const { user } = ChatState();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      px={3}
        background={'#f3f3f3'}
        paddingTop={'11px'}
        paddingBottom={'20px'}
    >
      <Box display="flex" alignItems={'center'} >
        <FontAwesomeIcon
          style={{ display: isSmallDevice ? 'block' : 'none', color: 'gray' }}
          cursor="pointer"
          size="xl"
          onClick={() => setSelectedChat("")}
          icon={faArrowLeft}
        />
        {!selectedChat.isGroupChat ? (
          <Box display="flex"  ml={3}>
            <Avatar
              mr={2}
              cursor="pointer"
             
              src={getProfileSender(user, selectedChat.users)}
            />
            <Text mt={'1'} paddingLeft={'7px'}  fontWeight={'700'} letterSpacing={'.41px'} fontSize={'1.6rem'} fontFamily={'Open Sans'}>{getChatEnderName(user, selectedChat.users)}</Text>
          </Box>
        ):(
            <Box display="flex"  ml={3}>
             <Text mt={'1'} paddingLeft={'7px'}  fontWeight={'700'} letterSpacing={'.41px'} fontSize={'1.6rem'}  fontFamily={'Open Sans'}>{selectedChat.chatName}</Text>
            </Box>
        )}
      </Box>
      <List display={'flex'} gap={'1em'}  flexDirection="row">
        <ListItem>
           <FontAwesomeIcon
         color='black'
          cursor="pointer"
         
          onClick={() => setSelectedChat("")}
          icon={faMagnifyingGlass}
        />
            </ListItem>
           { !selectedChat.isGroupChat && <ListItem >
            <FontAwesomeIcon
         color='black'
          cursor="pointer"
          
        
          onClick={() => setSelectedChat("")}
          icon={faPhone}
        />
            </ListItem>}

           {!selectedChat.isGroupChat && <ListItem>
            <FontAwesomeIcon
 color='black'
          cursor="pointer"
     
          onClick={() => setSelectedChat("")}
          icon={faVideo}
        />
            </ListItem>}
           
           
            <Menu >
  <MenuButton>
    <FontAwesomeIcon
      color='gray'
      cursor="pointer"
      size="md"
      icon={faEllipsisVertical}
    />
  </MenuButton>
 
      <ProfileViewModal selectedChat={selectedChat} user={user} />
   
</Menu>

</List>
    </Box>
  );
};

export default SingleChatHead;
