import Link from "next/link"
import {TbMailFast} from 'react-icons/tb'
import Button from "react-bootstrap/Button"

const MessageView = props => {
    let dateFormat = new Date(props.message.readAt)
    const sendIcon = (originalEmail) => {
        if(originalEmail !== props.userEmail){
            return <Link href={'/user/new-message?receiver=' + originalEmail}>
            <a><TbMailFast title='send message' size='1.5rem'/></a>
            </Link>
        }
    }
    return(
        <div className="mx-1 border mb-2 px-2 border-2 rounded">
            <p><b>From: </b>{props.message.sender} {sendIcon(props.message.sender)}</p>
            <p><b>To: </b>{props.message.receiver} {sendIcon(props.message.receiver)}</p>
            <p><b>Subject: </b>{props.message.subject}</p>
            {props.message.status === 'read' && <p><i>Read at {dateFormat.toDateString()}</i></p>}
            <p>{props.message.text}</p>
            {(props.message.sender !== props.userEmail) && 
            <Link href={'/user/new-message?receiver=' + props.message.sender + '&subject=Re:' + props.message.subject}>
                <Button>Reply</Button>
            </Link>}
        </div>
    )
}

export default MessageView