import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'

const VideoChat = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let localStream;
    let remoteStream;

    let init = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
        document.getElementById('user-1').srcObject = localStream
    }
   
    useEffect(() => {
        if (isOpen) {
            init();
        }
    }, [isOpen]);
   
  return (
    <>

       <FontAwesomeIcon
          color='black'
          cursor="pointer"
          icon={faVideo}
          onClick={onOpen}
        />

<Modal  isCentered onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <video className='video-player' id='user-1' autoPlay playsInline >


           </video>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoChat;
