import LoginRegisterArea from "../../components/User/LoginRegisterArea"
import { useContext } from "react"
import { UserContext } from "../../context/user-context"
import RegisterForm from "../../components/User/RegisterForm"
//import { useRouter } from "next/router"

const EditUserPage = props => {
    const userCtx = useContext(UserContext)
    //const router = useRouter()
    return(
        <>
        {!userCtx.user && <LoginRegisterArea />}
        {userCtx.user && <RegisterForm user={userCtx.user} mode='edit'/>}
        </>
    )
}

export default EditUserPage