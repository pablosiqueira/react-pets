import Head from "next/head"
import MessagesCardsList from "./MessagesCardsList"
import MessageView from "./MessageView"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Link from "next/link"

const MyMessages = props => {
    console.log(props.sentMessages)
    console.log(props.receivedMessages)
    const [selectedMsg, setSelectedMsg] = useState()

    let allMessages = []  
    allMessages =  props.sentMessages.concat(props.receivedMessages)

    const selectIdHandler = (id) => {
        let msg = allMessages.filter(item => item.id === id)[0]
        console.log(msg)
        setSelectedMsg(msg)
        const date = new Date()
        let msgData = {
            id,
            date,
            userId: props.user._id
        }
        if(msg.receiver === props.user.email && msg.status === 'unread'){
            readMessageApi(msgData)
        }
    }

    async function readMessageApi(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/read-message',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        console.log(resp)
    }

    return(
        
        <>
        <Head>
            <title>My Messages</title>
        </Head>
        <h1 className="text-center my-4">My Messages</h1>

        <Link href='/user/new-message'><Button variant="outline-dark" className="d-block mx-auto mb-4">New Message</Button></Link>

        <div className="d-flex justify-content-center flex-wrap">
            <div>
                <MessagesCardsList mode='received' messages={props.receivedMessages} onGetMessage={selectIdHandler}/>
                <MessagesCardsList mode='sent' messages={props.sentMessages} onGetMessage={selectIdHandler}/>
            </div>
            {selectedMsg && <MessageView message={selectedMsg} userEmail={props.user.email}/>}
        </div>
        </>
    )
}

export default MyMessages