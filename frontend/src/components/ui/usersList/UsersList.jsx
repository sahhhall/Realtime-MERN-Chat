import React from 'react'

const UsersList = ({}) => {
  return (
    <div>
          <Stack >
          {filterdUsers.length>0 && filterdUsers.map((user) => (
            <Box
              key={user._id}
              display={'flex'}
              onClick={() => handleClick(user)}
              cursor="pointer"
              bg={'#0000'}
              color={ "black"}
              px={3}
              py={2}
              borderRadius="lg"
            >
              <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                src={user.picture}
              />
              <Box>
                <Text>
                  {user.name}
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>
    </div>
  )
}

export default UsersList