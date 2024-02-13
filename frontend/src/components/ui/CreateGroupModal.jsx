import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import SearchBar from './searchBar/SearchBar';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const CreateGroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false);
  const { user, chat, setChats } = ChatState();
  const [groupName, setGroupName] = useState();
  const [addedUsers, setAddUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [filterdUsers, setFilteredUser] = useState([]);
  const [searchReult, setSearchResult] = useState([]);
  const [inputValues, setInputValues] = useState({
    groupName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInputValues((preveiousValues) => ({
      ...preveiousValues,
      [event.target.name]: event.target.value,
    }));
  };

  // validation and modal switching 
  const handleSubmit = async() => {
    console.log("hhh");
    if(addedUsers.length < 1 ){
      toast.error(`please add atleast one user`)
      return
    }
        const config = {
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        };
        toast.promise(
          axios.post('http://localhost:4001/api/chat/group', {
            users: JSON.stringify(addedUsers.map((user) => user._id)),
            name: inputValues.groupName
          }, config)
          .then(response => {
            const { data } = response;
            // add into chat list && need group in the first place so put on first 
            setChats([data, ...chat]);
            onClose();
            setIsOpenSecondModal(false);
           
          })
          .catch(error => {
            toast.error(`failed to create group chat ${error.response.data.message}`)
          }),
          {
            loading: 'Creating...',
            success: <b>Group created!</b>,
            error: <b>Not Created!try again.</b>,
          }
        );
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:4001/api/user?search`, config);
      setUsers(data);
      setFilteredUser(data);
      setLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    console.log(value);
    const regex = new RegExp(`^${value}`, 'i');
    const filteredUsers = users.filter((user) => regex.test(user.name));
    console.log(filteredUsers, 'filter');
    setFilteredUser(filteredUsers);
  };
  const handleGroup = (userAdd) => {
    if (addedUsers.includes(userAdd)) {
      const updatedUsers = addedUsers.filter((user) => user !== userAdd);
      setAddUsers(updatedUsers);
    } else {
      setAddUsers([...addedUsers, userAdd]);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={'17%'}>
          <ModalHeader style={{ fontWeight: '600', color: 'black' }}>Create Group</ModalHeader>
          <ModalBody pt={5} pb={6}>
            <Input
              variant="flushed"
              placeholder="Group name"
              value={inputValues.groupName}
              onChange={handleChange}
              name="groupName"
            />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-modal" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {inputValues.groupName.trim().length>= 3 && inputValues.groupName.trim().length <= 13 ?<Button onClick={() => setIsOpenSecondModal(true)} className="btn-modal">
              Next
            </Button>: <Button color={'gray'} cursor={'not-allowed'} style={{
               border: 'none' ,
               outline: 'none' ,
               boxShadow: 'none' ,
               background: 'none' 
            }}>
              Next
            </Button> }
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal scrollBehavior={'inside'} isOpen={isOpenSecondModal} onClose={() => setIsOpenSecondModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontWeight: '600', color: 'black' }}>
            Add Members <span style={{ fontWeight: 'normal', fontSize: '10px', marginLeft: '4px' }}>1/100</span>
          </ModalHeader>
          <ModalBody pt={5} pb={6}>
            <SearchBar
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                handleSearch(event.target.value);
              }}
            />
            <hr style={{ marginTop: '8px' }} />
            <Box display="flex" flexDirection="row" marginTop={'9px'}>
              {addedUsers.map((user) => (
                <Box key={user._id} display="flex" flexDirection="column" alignItems="center" mr={4}>
                  <Box position="relative">
                    <Avatar src={user.picture} />
                    <FontAwesomeIcon
                      cursor={'pointer'}
                      onClick={() => handleGroup(user)}
                      icon={faTimesCircle}
                      size="lg"
                      style={{ position: 'absolute', top: 0, right: 0, color: '#c7c7c7' }}
                    />
                  </Box>
                  <Text mt={2}>{user.name}</Text>
                </Box>
              ))}
            </Box>
            <hr style={{ marginTop: '8px' }} />
            <Stack>
              {filterdUsers.length > 0 &&
                filterdUsers.map((user) => (
                  <Box
                    key={user._id}
                    display={'flex'}
                    onClick={() => handleGroup(user)}
                    cursor="pointer"
                    bg={addedUsers.find((addedUser) => addedUser._id === user._id) ? '#D3D3D3' : '#0000'}
                    color={'black'}
                    px={3}
                    py={2}
                    borderRadius="lg"
                  >
                    <Avatar mr={2} cursor="pointer" src={user.picture} />
                    <Box>
                      <Text>{user.name}</Text>
                    </Box>
                  </Box>
                ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} className="btn-modal" onClick={() => { setIsOpenSecondModal(false); onOpen(); }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="btn-modal">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
