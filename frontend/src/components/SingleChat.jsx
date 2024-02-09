import React from 'react'
import { ChatState } from '../context/ChatProvider'
import logo from '../assets/SAchat.png'
import SingleChatHead from './ui/singlechat/SingleChatHead'
import SingleChatWelcome from './ui/singlechat/SingleChatWelcome'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { selectedChat, setSelectedChat ,  } = ChatState()
  return (
    < >
         {
            selectedChat ? (
                <>
                <SingleChatHead selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
                </>
            ) : (
                <SingleChatWelcome logo={logo} />
            )
         } 
    </>
  )
}

export default SingleChat