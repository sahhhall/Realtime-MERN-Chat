import { Box, Button, Tooltip, Text, Menu, useDisclosure, Input, InputGroup, InputRightElement, InputLeftElement, Avatar } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
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
import UserBoxModel from '../UserChatLog/UserBoxModel';
import { ChatBoxHistory } from '../UserChatLog/ChatBoxHistory';
import debounce from '../../utils/debounce';
import { useNavigate } from 'react-router-dom';

function UserChats () {
  const [ search, setSearch ] = useState("");
  const [ searchResult, setSearchResult ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ loadinCht , setLoadingCht ] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setSElectedChat } = ChatState();
  const navigate = useNavigate();
  const handleSearch = async (value) => {
    setSearch(value); 
    if (!value) {
      
      return;
    }
    try {
      console.log(1111);
 
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      const { data } = await axios.get(`http://localhost:4001/api/user?search=${value}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
    }
  };
// usecallback providev us the memozized callback 
  const optimizedHandler = useCallback(debounce(handleSearch),[])
  const accessChat = async() => {
    setSearch(""); 
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

  const handleSignout = () => {
    localStorage.removeItem("userDetails")
    navigate('/')
  }
  return (
    < div 
    style={{width:'40%'}}
    className='user-chat-main'
    >
    <Menu style={{ display: 'flex', alignItems: 'center',   }} >
      <div  >
      
  
      <InputGroup className='input-grp-search' alignItems={'center'} style={{ marginLeft: '5px' ,width:'70%'}}>
  <Button variant={'ghost'} onClick={onOpen}>
    <FontAwesomeIcon icon={faBars} />
  </Button>
  <InputGroup>
  <Input
  marginLeft={'5px'}
  className='input-field-chat'
  placeholder='Search Users...'
  mr={2}
  value={search}
  focusBorderColor='blue.100'
  outline={'none'}
  onChange={(event) => {
    setSearch(event.target.value);
    optimizedHandler(event.target.value); 
   
  }}
/>

    <InputRightElement
    mr={'9px'}
     hover={'none'}
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
<Box
 w={'70%'}
 className='box-user-chatlist'  > 
{search.trim().length > 0 && (
  loading ? (
    <UserLoad />
  ) : (
    searchResult.map((user) => (
      <UserBoxModel
        key={user._id}
        user={user}
        handleFunction={() => accessChat(user._id)}
      />
    ))
  )
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
          <DrawerHeader borderBottomWidth='1px' display={'flex'} alignItems={'center'}  >
          <Avatar
           name={user.name}
            src={user.picture}
            size='lg'
            />
           
            <Text ml={'4px'} pl={'18px'} >
              {user.name}
            </Text>
          </DrawerHeader>
        
            <Text className='logout-btn' onClick={handleSignout}>
                 
            <FontAwesomeIcon  icon={faRightFromBracket} style={{paddingLeft:'1.7rem',paddingRight:'1rem'}} />
            
              Logout
         
            </Text>
            <hr />
         
        </DrawerContent>
      </Drawer>
     

    </div>
  )
}

export default UserChats