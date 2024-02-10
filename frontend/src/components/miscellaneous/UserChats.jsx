import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCoffee, faMagnifyingGlass, faPenToSquare, faRightFromBracket, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import UserLoad from '../ui/UserLoad';
import { ChatState } from '../../context/ChatProvider';
import UserBoxModel from '../UserChatLog/UserBoxModel';
import { ChatBoxHistory } from '../UserChatLog/ChatBoxHistory';
import debounce from '../../utils/debounce';
import { useMediaQuery } from "@uidotdev/usehooks";
import CreateGroupModal from '../ui/CreateGroupModal';
function UserChats({ fetchAgain }) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCht, setLoadingCht] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat, chat, setChats } = ChatState();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 902px)");

  // this for dev testinh 
  // const chatHistory = new Array(10).fill(null);

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) {
      return;
    }
    try {
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
  const optimizedHandler = useCallback(debounce(handleSearch), []);

  const accessChat = async (userId) => {
    setSearch('');
    try {
      setLoadingCht(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(`http://localhost:4001/api/chat`, {
        userId
      }, config);
      // here appending chat 
      console.log(data,8);
      if(!chat.find((chats) => chats._id === data._id) ) setChats([data,...chat]);
      setSelectedChat(data);
      setLoadingCht(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignout = () => {
    localStorage.removeItem('userDetails');
    // Clear User Data on Logout
    setSelectedChat(null); // Clear selected chat
    setChats([]);
    navigate('/');
  };

  return (
    <Box style={{ width: '40%', display: selectedChat && isSmallDevice ? 'none' : 'block' }} className='user-chat-main'>
    <Menu style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <InputGroup className='input-grp-search' alignItems={'center'} style={{ marginLeft: '5px', width: '100%' }}>
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
                children={<Button background={'transparent'}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>}
              />
            </InputGroup>
          </InputGroup><hr style={{marginTop:'6px',width:'100%'}} />
         
          <Box className="sidebar-scroll" style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
            <Box w={'100%'} className='box-user-chatlist'>
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
              <hr />
              <ChatBoxHistory fetchAgain={fetchAgain} />
            </Box>
          </Box>
        </div>
      </Menu>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent background={' #121212;'}>
          <DrawerHeader borderBottomWidth='.1px' display={'flex'} alignItems={'center'}>
            <Avatar name={user.name} src={user.picture} size='lg' />
            <Text ml={'4px'} pl={'18px'} color={'white'}>
              {user.name}
            </Text>
          </DrawerHeader>
          <CreateGroupModal>
          <Text className='logout-btn'>
            <FontAwesomeIcon icon={faUserGroup} style={{ paddingLeft: '1.7rem', paddingRight: '1rem' }} />
            New Group
          </Text>

          </CreateGroupModal>
          <Text className='logout-btn' onClick={handleSignout}>
            <FontAwesomeIcon icon={faRightFromBracket} style={{ paddingLeft: '1.7rem', paddingRight: '1rem' }} />
            Logout
          </Text>
          <DrawerFooter display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} mt="auto">
            <Text className='drawer-footer'>SAChat Desktop</Text>
            <Text className='drawer-footer'> Version 1.0.1 X64</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default UserChats;
