import classes from './Home.module.css'
import LoginBar from "./LoginBar"
import CategoriesBar from "./CategoriesBar"
import Navbar from "react-bootstrap/Navbar"
import {MdPets} from 'react-icons/md'
import Container from 'react-bootstrap/Container'
import SearchBar from './SearchBar'

const TopBar = (props) => {
    return(
        <>
        <Navbar  variant='light' expand="lg" className={classes.topbar}>
            <Container>
                <Navbar.Brand href="/">
                    <MdPets color='#CCAD8F' size='2.5rem'/> <span>PET ADOPTION CENTER</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className='justify-content-end'/>

                <Navbar.Collapse id="basic-navbar-nav">

                    <SearchBar />  

                    <LoginBar />

                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        <CategoriesBar />
        </>
    )
}

export default TopBar