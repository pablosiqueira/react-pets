import LoginRegisterArea from "../../components/User/LoginRegisterArea"
import { useContext } from "react"
import { UserContext } from "../../context/user-context"
import UserMainPage from "../../components/UserArea/UserMainPage"

const UserPage = props => {
    const userCtx = useContext(UserContext)
    return(
        <>
        {!userCtx.user && <LoginRegisterArea />}
        {userCtx.user && <UserMainPage user={userCtx.user} mode='edit'/>}
        </>
    )
}

export default UserPage