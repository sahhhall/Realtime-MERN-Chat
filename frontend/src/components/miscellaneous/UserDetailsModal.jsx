import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleInfo, faEnvelope, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { getCommonGroupCount, getCreatedAt } from '../../config/chatHelpers';
import { ChatState } from '../../context/ChatProvider';

const UserDetailsModal = ({ userDetails, selectedChat, user }) => {
    // userDetails comes from ProfileViewModal 
    const [userDetailModal, setUserDetailModal] = useState(false);
    const { chat } = ChatState();

    return (
        <div>
            <MenuItem onClick={() => setUserDetailModal(true)}>
                <FontAwesomeIcon
                    cursor="pointer"
                    icon={faCircleInfo}
                />
                &nbsp; &nbsp;More details
            </MenuItem>

            <Modal
                isOpen={userDetailModal}
                onClose={() => setUserDetailModal(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader display={'flex'} borderBottom={'1px outset #f3f3f3'} justifyContent={'center'} > User details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box mt={7} display="flex" flexDirection={'column'}  justifyContent={'center'}  alignItems="center"  >
                            <Avatar  size={'2xl'} name="User" src={userDetails.picture} />
                            <Text fontWeight={'800'} mt={'3'} letterSpacing={'.5px'} >
                                {userDetails.name}   
                            </Text>
                            <Text color={'gray'} textAlign="center" alignItems="center">
                                To help keep our community authentic, we’re showing <br />
                                information about accounts on Instagram.{" "}
                            </Text>
                            <Text color={'white'} ml={2}>{userDetails.name}</Text>
                        </Box>

                        <Box pt={'23px'} flexDirection={'column'} display="flex" alignItems="center">
                            <FontAwesomeIcon
                                cursor="pointer"
                                icon={faUserGroup}
                                size='1x'
                            />
                            <Text  mt={'1'} ml={2} >
                                {getCommonGroupCount(user, selectedChat.users, chat)} Groups in common
                            </Text>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <FontAwesomeIcon color='black'  icon={faCalendar} />
                                <Text mt={'1'} ml={2} fontSize={'small'}>
                                    Date joined {getCreatedAt(user, selectedChat.users)}
                                </Text>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <FontAwesomeIcon
                                cursor="pointer"
                                icon={faEnvelope}
                                size='1x'
                                color={'white'} 
                            />
                            <Text color={'white'}  paddingLeft={'6px'} mt={'1'} ml={2} >
                                {userDetails.email}
                            </Text>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UserDetailsModal;
