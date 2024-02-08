import { Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, border, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const CreateGroupModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpenSecondModal, setIsOpenSecondModal] = useState(false);
    const { user, chat , setChats } = ChatState();
    const [ groupName , setGroupName ] = useState()
    const [ addedUsers , setAddUsers ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ searchReult , setSearchResult] = useState([])
    const [ inputValues , setInputValues] = useState({
      groupName:'',

    })
console.log(inputValues.groupName);
    const handleChange = (event) => {
      setInputValues((preveiousValues) => ({
        ...preveiousValues,
        [event.target.name]: event.target.value,

      }))
    }

    const handleNextClick = () => {
      onClose()
      setIsOpenSecondModal(true)
    }
  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
      top={'17%'}
      
      >
        <ModalHeader style={{fontWeight:'600',color:'black'}}>
          Create Group
        </ModalHeader>
      
        <ModalBody pt={5} pb={6}>
        <Input
         variant='flushed' 
         placeholder='Group name' 
         value={inputValues.groupName}
         onChange={handleChange}
         name='groupName'
         
         />
        </ModalBody>

        <ModalFooter>
        <Button  mr={3} style={{  background: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    color:'#77C3EC'}} onClick={onClose}>Cancel</Button>
          <Button onClick={handleNextClick}  style={{  background: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    color:'#77C3EC'
    }}>
            Next
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>

 <Modal isOpen={isOpenSecondModal} onClose={() => setIsOpenSecondModal(false)}>
        <ModalOverlay />
      <ModalContent 
      top={'17%'}
      
      >
        <ModalHeader style={{fontWeight:'600',color:'black'}}>
        Add Members <span style={{fontWeight:'normal',fontSize:'10px', marginLeft:'4px'}}>1/100</span>
        </ModalHeader>
      
        <ModalBody pt={5} pb={6}>
        <InputGroup>
              <Input
                marginLeft={'5px'}
                className='input-field-chat'
                placeholder='Search Users...'
                mr={2}
            
                focusBorderColor='blue.100'
                outline={'none'}
               
              />

              <InputRightElement
                mr={'9px'}
                hover={'none'}
                cursor={'disabled'}
                pointerEvents={'none'}
                children={<Button background={'transparent'}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>}
              />  
            </InputGroup>
            <hr style={{marginTop:'8px',}} />
            search

            <Stack overflowY={'scroll'} sx={{ 
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
          {users.map((user) => (
            <Box
              key={user._id}
              display={'flex'}
              onClick={() => handleClick(user)}
              cursor="pointer"
              bg={'#0000'}
              color={ "black"}
              px={3}
              py={2}
              borderRadius="lg"
            >
              <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                src={user.picture}
              />
              <Box>
                <Text>
                  {user.name}
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>
        </ModalBody>

        <ModalFooter>
        <Button  mr={3} style={{  background: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    color:'#77C3EC'}} onClick={() =>{ 
      setIsOpenSecondModal(false)
      onOpen()
       }}>Cancel</Button>
          <Button onClick={handleNextClick}  style={{  background: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    color:'#77C3EC'
    }}>
           Create
          </Button>
          
        </ModalFooter>
      </ModalContent>
      </Modal>

  </>
  )
}

export default CreateGroupModal