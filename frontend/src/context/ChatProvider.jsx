import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [ selectedChat, setSelectedChat ] = useState()
  const [ chat, setChats ] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUser(userDetails);
    
    if (!userDetails) {
          navigate('/');
      
    } else {
    
        navigate('/chat');
      
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chat, setChats }}>
      {children}
    </ChatContext.Provider>
  );
}

// custom hook for cecking user exist or not on chatpa 
export const ChatState = () => {
  return useContext(ChatContext);
}

export default ChatProvider;
