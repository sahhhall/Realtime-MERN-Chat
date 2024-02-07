import { Box, Button, Tooltip, Text, Menu, useDisclosure, Input, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios';
import UserLoad from '../UserLoad'
import { ChatState } from '../../context/ChatProvider';
import UserBoxModel from '../UserBox/UserBoxModel';
import { ChatBoxHistory } from '../UserBox/ChatBoxHistory';
function UserChats () {
  const [ search, setSearch ] = useState("");
  const [ searchResult, setSearchResult ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ loadinCht , setLoadingCht ] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setSElectedChat } = ChatState();
  const handleSearch = async(value) => {
    setSearch(value)
    if(!search){
      return
    }
    try{
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,

        }
      }

      const { data } = await axios.get(`http://localhost:4001/api/user?search=${value}`,config)
      setLoading(false)
      setSearchResult(data)
    }catch(error){
      console.log(error.message);
    }
  }

  const accessChat = async() => {
    try{
      setLoadingCht(true)
      const config = {
        headers : {
          Authorization: `Bearer ${user.token}`,
          "Content-type" : "application/json"
        }
      }
      const { data } = await axios.post(`http://localhost:4001/api/chat`,{
        userId
      },config)
      setSElectedChat(data);
      setLoadingCht(false)
    }catch(error){
      console.log(error.message);
    }
  }
  return (
    < >
    <Menu style={{ display: 'flex', alignItems: 'center',   }} >
      <div  >
      
  
      <InputGroup alignItems={'center'} style={{ marginLeft: '5px' ,width:'80%'}}>
  <Button variant={'ghost'} onClick={onOpen}>
    <FontAwesomeIcon icon={faBars} />
  </Button>
  <InputGroup>
  <Input
    marginLeft={'5px'}
    placeholder='Search...'
    mr={2}
    value={search}
    focusBorderColor='blue.100'
    outline={'none'}
    onChange={(event) => handleSearch(event.target.value)}
    
  />
    <InputRightElement
    mr={'9px'}
      _hover={'none'}
      cursor={'disabled'}
      pointerEvents={'none'}
      children={<Button
        background={'transparent'}
      >
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </Button>}
    />
  </InputGroup>
</InputGroup><br />
<Box w={'70%'}  > 
{loading ? (
  <UserLoad />
) : (
  searchResult.map((user) => (
    <UserBoxModel
      key={user._id}
      user={user}
      handleFunction={() => accessChat(user._id)}
    />
  ))
)}
<ChatBoxHistory/>
</Box>
      </div>


  <div>
    <Menu>
      {/* Menu items */}
    </Menu>
  </div>
</Menu>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
     

    </>
  )
}

export default UserChats