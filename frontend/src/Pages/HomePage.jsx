import {Container, Box, Text, Image, Tabs, TabList, TabPanels, Tab, TabPanel  }  from '@chakra-ui/react'
import React from 'react'
import signin from '../assets/signIn.png'
const HomePage = () => {
    return (
        <Container centerContent>
            <Box className='top-box'>
                <Image src={signin}
                    alt='sign in'
                    boxSize='50px'
                    objectFit='cover'/>
                <Text className='text-sign'>
                    Sign in
                </Text>
            </Box>
            <Box>
                <Tabs >
                    <TabList width={'300px'}>
                        <Tab width={'50%'}>Sign In</Tab>
                        <Tab  width={'50%'}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage
