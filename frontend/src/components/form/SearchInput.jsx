import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import debounce from '../../utils/debounce';    

const SearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState('');
// usecallback providev us the memozized callback 
// const optimizedHandler = useCallback(debounce(handleSearch), []);

  const optimizedHandler = debounce((value) => {
    setSearch(value)
    onSearch(value);
  });

  return (
    <InputGroup alignItems={'center'}>
      <Input
        className='input-field-chat'
        placeholder='Search Users...'
        mr={2}
        value={search}
        focusBorderColor='blue.100'
        outline={'none'}
        onChange={(event) => {setSearch(event.target.value) ;optimizedHandler(event.target.value)}}
      />

      <InputRightElement
        mr={'9px'}
        hover={'none'}
        cursor={'disabled'}
        pointerEvents={'none'}
        children={<Button background={'transparent'}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>}
      />
    </InputGroup>
  );
};

export default SearchInput;
