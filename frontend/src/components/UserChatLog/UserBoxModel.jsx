import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const  UserBoxModel = ({user,handleFunction}) => {
    
 console.log(user.picture)
    return (
    <div  >
  <Box display={'flex'}
      onClick={handleFunction}
      cursor="pointer"
      ml={'6px'}
    pt={'8px'}p={'8px'}
      _hover={{
        background: "#E0E0E0",
        
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      
    >
      <Avatar
        mr={2}
        cursor="pointer"
        src={user.picture}
        
      />
      <Box>
        <Text>{user.name}</Text>    
      </Box>
    </Box>
    </div>
  )
}

export default UserBoxModel