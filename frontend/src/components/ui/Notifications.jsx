import React, { useEffect } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-hot-toast';
import { Avatar } from '@chakra-ui/react';
import formatedDate from '../../utils/formatDate';

const Notifications = () => {
  const { notification, setNotification } = ChatState();
    if(notification&& setTimeout(()=>{
        setNotification("")
    },1000))

    useEffect(()=>{
        { notification&&   toast((t) => (
            <div style={{display:'flex',alignItems:'center',textAlign:'center'}} >
              {/* Avatar */}
              <Avatar
               
                src={notification.sender && notification.sender.picture}
                alt=""
              />
           
              <div style={{padding:'0em 2.5em'}} >
                <p  style={{fontWeight:300,}} >{notification.content}</p>
            
              </div>
             
            </div>
          ));}
      
    },[notification])

 
  return null
};

export default Notifications;
