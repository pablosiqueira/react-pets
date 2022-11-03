import Modal from 'react-bootstrap/Modal';
import {FiCheckCircle} from 'react-icons/fi'
import classes from './UI.module.css'

const MessageModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className={'text-center ' + classes.fontRoboto}>
        <FiCheckCircle color='green' size='4rem'/>
        <p>{props.message}</p>
      </Modal.Body>
    </Modal>
  );
}

export default MessageModal