import MessageForm from '../../../components/Messages/MessageForm';
import LoginRegisterArea from '../../../components/User/LoginRegisterArea';
import { useContext } from "react"
import { UserContext } from "../../../context/user-context"
import { useRouter } from 'next/router';

const NewMessagePage = (props) => {
    const userCtx = useContext(UserContext)
    const router = useRouter()
    let receiver = router.query.receiver
    let subject = router.query.subject

    return (
        <>
            {!userCtx.user && <LoginRegisterArea />}
            {userCtx.user && <MessageForm receiver={receiver} sender={userCtx.user.email} subject={subject}/>}
        </>
    )
}

export default NewMessagePage