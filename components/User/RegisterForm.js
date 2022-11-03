import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useContext } from 'react';
import { hash } from 'bcryptjs';
import Spinner from 'react-bootstrap/Spinner';
import MessageModal from '../UI/MessageModal';
import { UserContext } from '../../context/user-context';
import classes from './Forms.module.css'

const RegisterForm = props => {
    const userCtx = useContext(UserContext)

    console.log('mode')
    console.log(props.mode)
    const [formError,setFormError] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [modalShow,setModalShow] = useState(false)

    const [name,setName] = useState(props.user ? props.user.name : '')
    const [email,setEmail] = useState(props.user ? props.user.email : '')
    const [password,setPassword] = useState('')
    const [passwordRepeat,setPasswordRepeat] = useState('')
    const [street,setStreet] = useState(props.user ? props.user.address.street : '')
    const [number,setNumber] = useState(props.user ? props.user.address.number : '')
    const [zip,setZip] = useState(props.user ? props.user.address.zip : '')
    const [city,setCity] = useState(props.user ? props.user.address.city : '')
    const [state,setState] = useState(props.user ? props.user.address.state : '')
    const [country,setCountry] = useState(props.user ? props.user.address.country : '')

    async function callCreateApi(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        let url
        if(props.user){
            url = '/api/edit-user?id=' + props.user._id
        }else{
            url = '/api/create-user'
        }
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        setFormError(resp.message)
        if(resp.status === 'error'){
            setFormError(resp.message)
        }else{
            setFormError('')
            setIsLoading(false)
            setFormError(resp.message)
            setModalShow(true)
            if(props.mode === 'data'){
                console.log('new login')
                userCtx.login({...enteredData, _id: props.user._id})
            }
            setTimeout(()=>{
                setModalShow(false)
                if(!props.user){
                    props.onChangeLoginState(true)
                }

            }, 3000);
        }
        setIsLoading(false)
    }

    const editUser = (event) => {
        event.preventDefault()
        setIsLoading(true)
        let data
        if(props.mode === 'data'){
            data = {
                name,
                email,
                address: {
                    street,
                    number,
                    zip,
                    city,
                    state,
                    country
                }
            }
            console.log(data)
            callCreateApi(data)
        }else{
            if(password !== passwordRepeat){
                setFormError(true)
                return
            }
            let secretPassword
            hash(password,10).then(
            (hashedPassword) => {
                data = {password: hashedPassword}
                console.log(data)
                callCreateApi(data)
            })
        }
        
    }


    const createUser = (event) => {
        event.preventDefault()
        setIsLoading(true)
        if(password !== passwordRepeat){
            setFormError(true)
            setIsLoading(false)
            return
        }
        setFormError('')
        let secretPassword
        hash(password,10).then(
            (hashedPassword) => {
                secretPassword = hashedPassword
                const data = {
                    name,
                    email,
                    password: secretPassword,
                    address: {
                        street,
                        number,
                        zip,
                        city,
                        state,
                        country
                    },
                    orders: []
                }
                callCreateApi(data)
            }
        ).catch((error) => {
            setFormError('Internal Error, Try Again')
            setIsLoading(false)
        })
        
    }
    return (
    <>
        <h1 className={'text-center my-4 text-capitalize ' + classes.fontRoboto}>{props.user ? ('Edit User ' + props.mode) : 'Register'}</h1>
        <Form className={'d-block mx-auto mb-4 ' + classes.fontRoboto} style={{maxWidth:'500px'}} onSubmit={props.user ? editUser : createUser}>

        {props.mode !== 'password' &&
        <FloatingLabel label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
        </FloatingLabel>
        }
        
        {props.mode !== 'data' &&
        <>
        <FloatingLabel label={props.user ? 'New Password' : 'Password'} className="mb-3">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        </FloatingLabel>

        <FloatingLabel label={props.user ? 'Repeat New Password' : 'Repeat Password'} className="mb-3">
            <Form.Control type="password" placeholder="Password" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} required/>
        </FloatingLabel>
        </>
        }

        {props.mode !== 'password' &&
        <>
        <FloatingLabel label="Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} required/>
        </FloatingLabel>

        <Form.Label>Address Information</Form.Label>
        <FloatingLabel label="Street" className="mb-3">
            <Form.Control type="address" placeholder="Street" value={street} onChange={(event) => setStreet(event.target.value)} required/>
        </FloatingLabel>
        <FloatingLabel label="Number" className="mb-3">
            <Form.Control type="address" placeholder="Number" value={number} onChange={(event) => setNumber(event.target.value)} required/>
        </FloatingLabel>
        <FloatingLabel label="Zip Code" className="mb-3">
            <Form.Control type="address" placeholder="Zip Code" value={zip} onChange={(event) => setZip(event.target.value)} required/>
        </FloatingLabel>
        <FloatingLabel label="City" className="mb-3">
            <Form.Control type="text" placeholder="City" value={city} onChange={(event) => setCity(event.target.value)} required/>
        </FloatingLabel>
        <FloatingLabel label="State/District" className="mb-3">
            <Form.Control type="text" placeholder="State" value={state} onChange={(event) => setState(event.target.value)} required/>
        </FloatingLabel>
        <FloatingLabel label="Country" className="mb-3">
            <Form.Control type="text" placeholder="Country" value={country} onChange={(event) => setCountry(event.target.value)} required/>
        </FloatingLabel>
        </>
        }

        <p className='text-danger'>{formError}</p>

        {!isLoading && <div className="d-grid gap-4">
            <Button variant="dark" type="submit" className='text-capitalize'>{props.user ? 
            ('Edit ' + props.mode) 
            : 'Create Account'}</Button>
            {!props.user && <Button variant="danger" onClick={()=>props.onChangeLoginState(true)}>Already have an account/Login</Button>}
        </div>}
        {isLoading && <div className='d-block mx-auto'>
        <Spinner className='d-block mx-auto' animation="border" role="status"></Spinner>
        <p className='text-center'>Loading...</p>
        </div>}

        <MessageModal show={modalShow} 
            onHide={() => {
                setModalShow(false)
                if(!props.user){
                    props.onChangeLoginState(true)
                }
            }} 
            message={formError}
        />
        </Form>
    </>    
    )
}

export default RegisterForm