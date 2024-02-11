import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import logo from '../assets/SAchat.png'
import SingleChatHead from './ui/singlechat/SingleChatHead'
import SingleChatWelcome from './ui/singlechat/SingleChatWelcome'
import { Box, FormControl, Input, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import ScrollableFeed from './ui/singlechat/ScrollableChatFeed'
import ScrollableChatFeed from './ui/singlechat/ScrollableChatFeed'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { selectedChat, setSelectedChat ,user   } = ChatState()
    const [messages, setMessages] = useState([]);
    const [loading, setloading] = useState(false)
    const [newMessage, setNewMessage ] = useState();


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
      }catch(error){
        console.log(error.data.message);
      }
    }
    // need fetch new messages the selectedChat changes so put that in dependency
    useEffect(() => {
      fetchMessages();
    },[selectedChat])
    const sendMessage = async(event) => {
      console.log("sendMessage called");
      if(event.key === "Enter" && newMessage ) {
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
          setMessages([...messages,data])
        }catch(error){
          console.log(error.data.message);
        }
      }
    }
    const typingHandler = (event) => {
      setNewMessage(event.target.value)
    }
  return (
    < >
         {
            selectedChat ? (
                <>
                <SingleChatHead selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
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