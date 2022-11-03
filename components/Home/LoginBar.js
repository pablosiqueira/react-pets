import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../../context/user-context'
import { useContext } from 'react'
import {FaUserCircle} from 'react-icons/fa'
import Link from 'next/link';
import Button from 'react-bootstrap/Button'
import classes from './Home.module.css'

const LoginBar = (props) => {
    const userCtx = useContext(UserContext)
    return(
        <>
             {!userCtx.user && 
            <Link href='/user'>
                <Button className={classes.topbar} variant='link'><b>Login/Register</b></Button>
            </Link>}
            {userCtx.user && 
            <Dropdown className='text-center'>
            <Dropdown.Toggle variant="link" id="dropdown-user" className={classes.ctglinkDark}>
                <FaUserCircle color='#CCAD8F' size='2.5rem'/> <span className={classes.loginLink}>Hello {userCtx.user.name.split(' ')[0]}</span>
            </Dropdown.Toggle>
      
            <Dropdown.Menu className={classes.fontRoboto}>
              <Dropdown.Item href="/user">My Account</Dropdown.Item>
              <Dropdown.Item href={"/user/my-messages/" + userCtx.user._id}>My Messages</Dropdown.Item>
              <Dropdown.Item href={"/user/my-pets/view/" + userCtx.user._id}>My pets</Dropdown.Item>
              <Dropdown.Item href={"/user/add-pet"}>Add pet</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={userCtx.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            }
        </>
    )
}

export default LoginBar