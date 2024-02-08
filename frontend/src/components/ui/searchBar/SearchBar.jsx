import { Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchBar = ({ value , onChange }) => {
  return (
    <div>
         <InputGroup>
              <Input
                onChange={onChange}
                value={value}
                marginLeft={'5px'}
                className='input-field-chat'
                placeholder='Search Users...'
                mr={2}
            
                focusBorderColor='blue.100'
                outline={'none'}
               
              />

              <InputRightElement
                mr={'9px'}
                hover={'none'}
                cursor={'disabled'}
                pointerEvents={'none'}
                children={<Button background={'transparent'}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>}
              />  
            </InputGroup>

    </div>
  )
}

export default SearchBar