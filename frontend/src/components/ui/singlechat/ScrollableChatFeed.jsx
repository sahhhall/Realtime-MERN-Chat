import React, { useRef, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChatState } from '../../../context/ChatProvider';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { isNotLoggedUser } from '../../../config/chatHelpers';

const ScrollableChatFeed = ({ messages }) => {
    const { user } = ChatState();
    const chatEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ marginBottom: '5px', overflowY: 'scroll', maxHeight: '75vh' }}>
            <InfiniteScroll
                dataLength={messages.length}
            >
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    textAlign="center"
                    mb={2} 
                >
                    <Box bg="gray.200" px={2} py={1} borderRadius="md" display="inline-block">
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                            23
                        </Text>
                    </Box>
                </Box>

                {messages && messages.map((message, index) => (
                    <div style={{ display: 'flex', marginTop: '.51em' }} key={message._id}>
                        {isNotLoggedUser(message, index, user._id) ? (
                            <>
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={message.sender.name}
                                    src={message.sender.picture}
                                />
                                <span style={{ background: '#f3f3f3', borderRadius: "20px", padding: "5px 15px", maxWidth: "75%" }}>
                                    {message.content}
                                </span>
                            </>
                        ) : (
                            <span style={{ justifyContent: 'flex-end', marginRight: '.61em', marginLeft: 'auto', background: ' hsl(144, 76%, 90%)', borderRadius: "20px", padding: "5px 15px", maxWidth: "75%" }}>
                                {message.content}
                            </span>
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </InfiniteScroll>
        </div>
    );
};

export default ScrollableChatFeed;
