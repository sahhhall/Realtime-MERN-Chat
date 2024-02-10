import { Avatar, Box, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { faCircle, faCircleInfo, faEnvelope, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { getCommonGroupCount } from '../../config/chatHelpers'
import { ChatState } from '../../context/ChatProvider'

const UserDetailsModal = ({ userDetails, selectedChat, user }) => {
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
                <ModalOverlay bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'/>
                <ModalContent bg={'hsl(220, 70%, 30%)'}>
                    <ModalHeader color={'white'} > User details</ModalHeader>
                    <ModalCloseButton color={'white'}  />
                    <ModalBody pb={6}>
                    <Box display="flex"  borderTop={'.5px outset gray'} alignItems="center" pt={'22px'} pb={'23px'} borderBottom={'1px outset gray'}>
  
    <Avatar size="md" name="User" src={userDetails.picture} />

    <Text color={'white'} ml={2}>{userDetails.name}</Text>
</Box>

                        <Box pt={'23px'} display="flex" alignItems="center">
                            <FontAwesomeIcon
                                cursor="pointer"
                                icon={faUserGroup}
                                size='1x'
                                color={'white'} 
                            />
                            <Text color={'white'}  paddingLeft={'6px'} mt={'1'} ml={2} >
                                {getCommonGroupCount(user, selectedChat.users, chat)} Groups in common
                            </Text>
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
