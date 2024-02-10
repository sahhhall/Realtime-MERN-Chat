import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, Button, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, Image, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { getCommonGroupCount, getUserFullDetails } from '../../config/chatHelpers';
import { ChatState } from '../../context/ChatProvider';
import UserDetailsModal from './UserDetailsModal';

const ProfileViewModal = ({ user, selectedChat }) => {
  // this for storing user all data 
  const [userDetails, setUserDetails] = useState();
 
  const { chat } = ChatState();
  useEffect(() => {
    const data = getUserFullDetails(user, selectedChat.users);
   
    setUserDetails(data);
  }, []);

 

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuList>
        <MenuItem onClick={onOpen}>
          <FontAwesomeIcon
            cursor="pointer"
           
            icon={faUser}
          />
          &nbsp; &nbsp;View Profile
        </MenuItem>
        {/* here need condition because we need render only after defined useDetails  */}
        {userDetails && <UserDetailsModal userDetails={userDetails} selectedChat={selectedChat} user={user} />}
      </MenuList>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        
        <ModalOverlay   bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent overflowX={'auto'}>
          <ModalHeader > {userDetails ? userDetails.name : 'Unknown User'}  Profile</ModalHeader>
          <ModalCloseButton />
          
          <Box display="flex" >
  <Image
   
    cursor="pointer"
    src={userDetails?.picture || ''}
    style={{
      objectFit:'fill',
      maxHeight: '100%',
      maxWidth: '100%'
    }}
  />
  {/* <Text mt={'1'} fontWeight={'500'} fontFamily={'Open Sans'}>
    {userDetails ? userDetails.name : 'Unknown User'}
  </Text>
  <Text mt={'1'} fontWeight={'500'} fontFamily={'Open Sans'}>
    {getCommonGroupCount(user, selectedChat.users, chat)}
  </Text> */}
</Box>
          
          
        </ModalContent>
      </Modal>

    </>
  );
};

export default ProfileViewModal;
