import ListGroup from 'react-bootstrap/ListGroup';
import  Badge  from 'react-bootstrap/Badge';
import {BsCheck2, BsCheck2All} from 'react-icons/bs'
import classes from './Messages.module.css'

const MessagesCardsList = props => {

    return(
        <>
        <ListGroup className='mb-2 mx-1'>
            <ListGroup.Item>
                {props.mode === 'received' ? 'Inbox' : 'Sent'}
            </ListGroup.Item>
            {props.messages.length === 0 && <ListGroup.Item>No messages</ListGroup.Item>}
            {props.messages.map(item => {
                return <ListGroup.Item
                as="li"
                className={"d-flex justify-content-between align-items-start " + classes.messageList}
                key={item.id}
                value={item.id}
                onClick={() => props.onGetMessage(item.id)}
                action
              >
                <div className="ms-2 me-auto">
                  <div className={item.status === 'unread' ? "fw-bold" : ''}>
                    {props.mode === 'received' ? item.sender : item.receiver}
                    </div>
                  {item.subject}
                </div>
                {(item.status === 'unread' && props.mode === 'received') && <Badge bg="danger" pill>
                  New
                </Badge>}
                {(item.status === 'unread' && props.mode === 'sent') && <BsCheck2 />}
                {(item.status === 'read' && props.mode === 'sent') && <BsCheck2All />}
              </ListGroup.Item>
            })}
        </ListGroup>
        </>
    )
}

export default MessagesCardsList