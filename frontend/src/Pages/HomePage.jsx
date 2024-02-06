import {
    Container,
    Box,
    Text,
    Image,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import signin from '../assets/signIn.png'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    
    
    return ( 
        <Container centerContent>
            <Box className='top-box'>
                <Image src={signin}
                    alt='sign in'
                    boxSize='50px'
                    objectFit='cover'/>
                <Text className='text-sign'>

                </Text>
            </Box>
            <Box>
                <Tabs>
                    <TabList width={'300px'}>
                        <Tab width={'50%'}>Log In</Tab>
                        <Tab width={'50%'}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                            <Box mt={'8px'}>
                                <p className='copyright-p'>a new era of messaging
                                </p>
                                <p className='ad-text'>Copyright ©  sahal 2024.</p>

                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                            <Box mt={'13px'}>
                                <p className='copyright-p'>a new era of messaging
                                </p>
                                <p className='ad-text'>Copyright ©  sahal 2024.</p>

                            </Box>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container>
    )
}

export default HomePage
