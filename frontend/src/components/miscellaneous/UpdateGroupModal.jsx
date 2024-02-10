import { Button, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ChatState } from '../../context/ChatProvider'

const UpdateGroupModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {  user, selectedChat, setSelectedChat}   = ChatState()

  return (
    <>
     <MenuList>
        <MenuItem onClick={onOpen}>
          <FontAwesomeIcon
            cursor="pointer"
           
            icon={faGear}
          />
          &nbsp; &nbsp;Edit group
        </MenuItem>
      </MenuList>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupModal