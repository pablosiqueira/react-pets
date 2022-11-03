import { useContext } from "react"
import { UserContext } from '../../context/user-context';
import Button from "react-bootstrap/Button"
import Head from "next/head";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from "next/link";
import {FaKey} from 'react-icons/fa'
import {ImExit} from 'react-icons/im'
import {MdPlaylistAdd, MdPets} from 'react-icons/md'
import {BiMessageDetail} from 'react-icons/bi'
import {TbMessages} from 'react-icons/tb'
import classes from './UserArea.module.css'
import { ListGroupItem } from "react-bootstrap";

const UserMainPage = props => {
    const userCtx = useContext(UserContext)
    /*const user = userCtx.user*/

    return (
        <>
            <Head>
                <title>User Area</title>
            </Head>
            <h1 className={"text-center my-4 " + classes.fontRoboto}>User Area</h1>
                <div className={"mx-1 " + classes.fontRoboto}>
                    <h5 className="text-center my-2">Personal Data{props.mode === 'edit' && <> - <Link href='/user/edit?mode=data'>Edit</Link></>}</h5>
                    <ListGroup variant="flush" className="d-block mx-auto border mb-3" style={{maxWidth:'500px'}}>
                        <ListGroup.Item><b>Name: </b>{props.user.name}</ListGroup.Item>
                        <ListGroup.Item><b>E-mail: </b>{props.user.email}</ListGroup.Item>
                        
                        {props.mode === 'edit' && <ListGroup.Item><b>Adress: </b><br/>
                            {props.user.address.street}<br/>
                            <b>Number:</b> {props.user.address.number} - <b>Zip:</b> {props.user.address.zip}<br/>
                            {props.user.address.city}/{props.user.address.state} - {props.user.address.country}
                        </ListGroup.Item>}

                        {props.mode === 'view' &&
                            <ListGroupItem>
                                <b>Location: </b>{props.user.address.city}/{props.user.address.state} - {props.user.address.country}
                            </ListGroupItem>
                        }
           
                    </ListGroup>
                </div>

            <div className="d-grid gap-2 mb-3 mx-auto" style={{maxWidth:'500px'}}>
                <Link 
                href={'/pets/all/all/' + props.user.address.country + '/' + props.user.address.state + '/' + props.user.address.city}>
                <Button variant="outline-dark" size="lg">
                View Pets in {props.user.address.city}
                </Button></Link>
                <Link 
                href={'/pets/all/all/' + props.user.address.country + '/' + props.user.address.state}>
                <Button variant="outline-dark" size="lg">
                View Pets in {props.user.address.state}
                </Button></Link>
                <Link 
                href={'/pets/all/all/' + props.user.address.country}>
                <Button variant="outline-dark" size="lg">
                View Pets in {props.user.address.country}
                </Button></Link>
            </div>    
                
            <div className={"d-flex flex-wrap justify-content-center my-4 " + classes.fontRoboto}>
                {props.mode === 'view' &&
                <>
                <div className="m-1">
                    <Link href={'/pets?user=' + props.user._id}>
                    <Button variant="dark">
                    <MdPets size='2.5rem'/><br/>
                    User Pets
                    </Button>
                    </Link>
                </div>
                <div className="m-1">
                    <Link href={'/user/new-message?receiver=' + props.user.email}>
                    <Button variant="dark">
                    <BiMessageDetail size='2.5rem'/><br/>
                    Send Message
                    </Button>
                    </Link>
                </div>    
                </>
                }
                
                {props.mode==='edit' &&
                <>
                    <div className="m-1">
                    <Link href={'/user/my-pets/view/' + props.user._id}>
                    <Button variant="dark">
                    <MdPets size='2.5rem'/><br/>
                    My Pets
                    </Button>
                    </Link>
                    </div>
                <div className="m-1">
                    <Link href='/user/add-pet'>
                    <Button variant="dark">
                    <MdPlaylistAdd size='2.5rem'/><br/>
                    Add Pet
                    </Button>
                    </Link>
                </div>

                <div className="m-1">
                    <Link href={'/user/my-messages/' + props.user._id}>
                    <Button variant="dark">
                    <TbMessages size='2.5rem'/><br/>
                    My Messages
                    </Button>
                    </Link>
                </div>

                <div className="m-1">
                    <Link href='/user/edit?mode=password'>
                    <Button variant="dark">
                    <FaKey size='2.5rem'/><br/>
                    Change Password
                    </Button>
                    </Link>
                </div>

                <div className="m-1">
                    <Button variant="danger" onClick={userCtx.logout}>
                    <ImExit size='2.5rem'/><br/>
                    Logout
                    </Button>
                </div>
                    </>
                }
                
            </div>

        </>
    )
}

export default UserMainPage