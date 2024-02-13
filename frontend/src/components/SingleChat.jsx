import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import logo from '../assets/SAchat.png'
import SingleChatHead from './ui/singlechat/SingleChatHead'
import SingleChatWelcome from './ui/singlechat/SingleChatWelcome'
import { Box, FormControl, Input, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import ScrollableFeed from './ui/singlechat/ScrollableChatFeed'
import Lottie from 'react-lottie'
import io from 'socket.io-client'
import ScrollableChatFeed from './ui/singlechat/ScrollableChatFeed'

const ENDPOINT= "http://localhost:4001";
var socket, selectedChatCompare;
const SingleChat = ({fetchAgain, setFetchAgain }) => {
    const { selectedChat, setSelectedChat ,user ,notification, setNotification,latestMessages , setLatestMessages  } = ChatState()
    const [messages, setMessages] = useState([]);
    const [loading, setloading] = useState(false)
    const [newMessage, setNewMessage ] = useState();
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    
    const fetchMessages = async() => {
      if(!selectedChat)return
      try{
        setloading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.get(`http://localhost:4001/api/message/${selectedChat._id}`,config)
       console.log("msgs",data);
        setMessages(data);
        setloading(false)
        socket.emit("join chat", selectedChat._id)
      }catch(error){
        console.log(error);
      }
    }
    useEffect(() => {
      socket = io(ENDPOINT)
      socket.emit("setup",user)
      socket.on('connected',()=> setSocketConnected(true))
      socket.on('typing',() => setIsTyping(true))
      socket.on('stop typing',() => setIsTyping(false))
    }, [])
   
    // need fetch new messages the selectedChat changes so put that in dependency
    useEffect(() => {
      fetchMessages();
      selectedChatCompare = selectedChat;
    },[selectedChat])
   /**
     * Callback function to handle incoming messages received from the socket server.
     * @param {Object} newMsgRecived The new message received from the socket server.
   */
  useEffect(() => {
      socket.on("message received", (newMsgRecived) => {
          if (!selectedChat || selectedChatCompare._id !== newMsgRecived.chat._id) {
              
                setNotification(newMsgRecived)
                //we want fetch this entire page soo
                setLatestMessages((prev) => [...prev,newMsgRecived])
                setFetchAgain(!fetchAgain)
           
          } else {
              console.log("fuck2");
              setMessages((prevMessages) => [...prevMessages, newMsgRecived]);
          }
      });
      return () => socket.off("message received"); 
  },[messages]);
  
    
    const sendMessage = async(event) => {
      console.log("sendMessage called");
      if(event.key === "Enter" && newMessage ) {
        socket.emit('stop typing',selectedChat._id)
        try{
          const config= {
            headers: {
              "Content-Type":"application/json",
              Authorization :`Bearer ${user.token}`
            }
          }
          setNewMessage("");
          const { data } = await axios.post('http://localhost:4001/api/message',{
            content:newMessage,
            chatId:selectedChat._id
          },config)
          console.log("drrr",data);
          socket.emit("new message", data);
          setMessages([...messages,data])
        }catch(error){
          console.log(error.data.message);
        }
      }
    }

  
    
    let typingTimer;

const typingHandler = (event) => {
  setNewMessage(event.target.value);
  if (!socketConnected) return;
  if (!typing ) {
    setTyping(true);
    socket.emit('typing', selectedChat._id);
  }
  
  let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
}

  return (
    < >
         {
            selectedChat ? (
                <>
                <SingleChatHead isTyping={isTyping} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  height={'75vh'}
                  overflowY={'hidden'}
                  bg={'white'}
                  justifyContent="flex-end"
                
                  >
                    {!loading? <> 
                    <div className='message-container'>
                      <ScrollableChatFeed  messages={messages}/>
                    </div>
                     </> : <Spinner alignSelf={'center'} margin={'auto'} size={'xl'} /> }
                </Box> 
                <FormControl  isRequired mb={1}  >
               
                  <Input
                    variant={'filled'}
                    placeholder="Type a message"
                    onChange={typingHandler}
                    onKeyDown={sendMessage}
                    value={newMessage}
                  />
                </FormControl>
                </>
            ) : (
                <SingleChatWelcome logo={logo} />
            )
         }
       
    </>
  )
}

export default SingleChat