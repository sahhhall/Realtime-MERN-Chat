import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ChatPage = () => {
    const [ chats , setChats ]  = useState([])
    const fetchData = async () => {
     const data = await axios.get("http://localhost:4001/api/chat")
     return data
     }
     useEffect(()=>{
        fetchData().then((data)=>{
                setChats(data.data)
        })
     },[])
    return(
        <div >
            Chatpage
            {chats.map((chats) =>
                chats.chatName
            )}
        </div>
    )
}

export default ChatPage