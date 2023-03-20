import LoginRegisterArea from "../../../components/User/LoginRegisterArea"
import { useContext } from "react"
import { UserContext } from "../../../context/user-context"
import UserMainPage from "../../../components/UserArea/UserMainPage"
import { MongoClient, ObjectId } from "mongodb"

const UserProfilePage = props => {
    const userCtx = useContext(UserContext)
    return(
        <>
        {!userCtx.user && <LoginRegisterArea />}
        {userCtx.user && <UserMainPage user={props.user} mode='view'/>}
        </>
    )
}

export async function getServerSideProps(context){
    const userId = context.params.userId
    if(!ObjectId.isValid(userId) || !userId){
        return{
            notFound:true
        }
    }
  const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
  const db = client.db()
  const usersCollection = db.collection('users')
  const selectedUser = await usersCollection.findOne({_id: new ObjectId(userId)})
  console.log(selectedUser)
  return{
    props:{
        user: {
            _id: selectedUser._id.toString(),
            name: selectedUser.name,
            email: selectedUser.email,
            address: {
                street: selectedUser.address.street,
                number: selectedUser.address.number,
                zip: selectedUser.address.zip,
                city: selectedUser.address.city,
                state: selectedUser.address.state,
                country: selectedUser.address.country
            }
        }
    }
  }
}

export default UserProfilePage