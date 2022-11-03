import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../../context/user-context';
import classes from './Forms.module.css'


const LoginForm = props => {
    const userCtx = useContext(UserContext)

    const [loginError,setLoginError] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function callLoginApi(enteredData){
        setIsLoading(true)
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        console.log(resp)
        if(resp.message !== 'Success'){
            console.log('error')
            setLoginError(resp.message)
            setIsLoading(false)
        }else{
            console.log('ok')
            setLoginError(resp.message)
            console.log(resp.data)
            setIsLoading(false)
            userCtx.login(resp.data)
        }
    }

    const submitLoginForm = (event) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
        setLoginError()
        const data = {email,password}
        callLoginApi(data)
    }
    return (
    <>
        <h1 className={'text-center my-4 ' + classes.fontRoboto}>Login</h1>
        <Form className={'d-block mx-auto ' + classes.fontRoboto} style={{maxWidth:'500px'}} onSubmit={submitLoginForm} autoComplete="on">

        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />

        <FloatingLabel label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=>setEmail(event.target.value)} required/>
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)} required/>
        </FloatingLabel>
        {loginError && <p className='text-danger mt-1 mb-2'>{loginError}</p>}
        {!isLoading && <div className="d-grid gap-4">
            <Button variant="dark" type="submit">Login</Button>
            <Button variant="danger" onClick={()=>props.onChangeLoginState(false)}>Create New Acount</Button>
        </div>}
        {isLoading && <div className='d-block mx-auto'>
        <Spinner className='d-block mx-auto' animation="border" role="status"></Spinner>
        <p className='text-center'>Loading...</p>
        </div>}
        </Form>
    </>    
    )
}

export default LoginForm