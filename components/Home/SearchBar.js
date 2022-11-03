import InputGroup  from 'react-bootstrap/InputGroup';
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import {GoSearch} from 'react-icons/go'
import { useState } from 'react';
import Router from 'next/router';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const getTermHandler = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            //Router.push('/pets/all?search=' + searchTerm)
        }
    }

    return(
        <InputGroup className='mx-1 justify-content-center'>
                <Form.Control
                  placeholder="Search Pet"
                  aria-label="Search Pet"
                  style={{maxWidth: '500px'}}
                  type="text"
                  value={searchTerm}
                  onChange={getTermHandler}
                  onKeyPress={handleKeyPress}
                  />
                <Link href={'/pets/all?search=' + searchTerm}>
                    <Button variant="outline-secondary" id="button-addon2">
                    <GoSearch color='white' size='1.5rem'/>
                    </Button>
                </Link>  
                
        </InputGroup>
    )
}

export default SearchBar