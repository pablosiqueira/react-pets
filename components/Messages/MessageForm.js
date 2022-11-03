import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Head from "next/head"
import classes from './Messages.module.css'
import { useState } from "react"

const MessageForm = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [receiver,setReceiver] = useState(props.receiver ? props.receiver : '')
    const [subject,setSubject] = useState(props.subject ? props.subject : '')
 
    const [msgText,setMsgText] = useState('')
    const [responseMsg, setResponseMsg] = useState()

    const receiverHandler = (event) => {
        setReceiver(event.target.value)
    }

    const subjectHandler = (event) => {
        setSubject(event.target.value)
    }

    const msgTextHandler = (event) => {
        setMsgText(event.target.value)
    }

    const sendMessage = (event) => {
        event.preventDefault()
        const date = new Date()
        const data = {
            receiver,
            sender: props.sender,
            subject,
            msgText,
            date,
            status: 'unread'
        }
        console.log(data)
        callMessageApi(data)
    }

    async function callMessageApi(enteredData){
        setIsLoading(true)
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/new-message',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        console.log(resp)
        if(resp.status === 'error'){
            console.log('error')
            setIsLoading(false)
        }else{
            console.log('ok')
            setIsLoading(false)
            setReceiver('')
            setSubject('')
            setMsgText('')
        }
        setResponseMsg(resp.message)
    }

    return(
        <>
        <Head>
            <title>New Message</title>
        </Head>

        <h1 className="text-center my-2">New Message</h1>

        <Form className={classes.text + ' my-2 px-2'} onSubmit={sendMessage}>

        <FloatingLabel className="my-2" label="To(e-mail)">
        <Form.Control type="email" placeholder="To" value={receiver} onChange={receiverHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="my-2" label="Subject">
        <Form.Control type="text" placeholder="Subject" value={subject} onChange={subjectHandler} required/>
        </FloatingLabel>

        <FloatingLabel  className="my-2" label="Type Message">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={msgText} onChange={msgTextHandler} required
          style={{ height: '300px' }}
        />
        </FloatingLabel>

        {responseMsg && <h5 className="text-center my-2">{responseMsg}</h5>}

        <Button type="submit" className="my-2">
        {!isLoading && <>Send</>}
        {isLoading && <>Loading...</>}
        </Button>

        </Form>
       
        </>
        
    )
}

export default MessageForm