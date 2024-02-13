import React, { useEffect } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-hot-toast';
import { Avatar } from '@chakra-ui/react';
import formatedDate from '../../utils/formatDate';

const Notifications = () => {
  const { notification, setNotification, setSelectedChat } = ChatState();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 1000);

      return () => clearTimeout(timer); 
    }
  }, [notification, setNotification]);
console.log(notification);
  useEffect(() => {
    if (notification) {
      toast((t) => (
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' ,cursor:'pointer'}}
        onClick={() => setSelectedChat(notification.chat)}
        
        >
          <Avatar src={ notification.sender && notification.sender.picture} alt="" />
          <div style={{ padding: '0em 2.5em' }}>
          {notification.chat.isGroupChat ? <p style={{fontWeight:500}} >{notification.chat.chatName}</p> :<p style={{fontWeight:500}} >{notification.sender && notification.sender.name}</p>}
            <p style={{ fontWeight: 300 }}>{notification.content}</p>
           
          </div>
        </div>
      ));
    }
  }, [notification]);

  return null; // Since we're using toast for notifications, we don't need to render anything in the component
};

export default Notifications;
