import MyMessages from "../../../components/Messages/MyMessages"
import { useContext } from "react"
import { UserContext } from "../../../context/user-context"
import { MongoClient, ObjectId } from "mongodb"
import LoginRegisterArea from '../../../components/User/LoginRegisterArea'
import { useRouter } from "next/router"
import Head from "next/head"

const MyMessagesPage = props => {
    const userCtx = useContext(UserContext)
    const user = userCtx.user
    const router = useRouter();
    const selectedId = router.query.userId;
    return(
        <>
        <Head>
            <title>My Messages</title>
        </Head>
        {(user && user._id !== selectedId) && <h1 className="text-center my-4">Access Denied</h1>}
        {!user && <LoginRegisterArea />}
        {(user && user._id === selectedId) && <MyMessages sentMessages={props.sentMsg} receivedMessages={props.receivedMsg} user={userCtx.user}/>}
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
    const selectedUser = await usersCollection.findOne({_id: ObjectId(userId)})
    let messages
    let sentMessages = []
    let receivedMessages = []
    let receivedIds = []
    let sentIds = []
    messages = selectedUser.messages
    //console.log(messages)
    if(messages.sent){
        messages.sent.map(item => {
            //let thisItem = item
            //thisItem._id = item._id.toString()
            sentIds.push(item)
        })
    }
    if(messages.received){
        messages.received.map(item => {
            receivedIds.push(item)
        })
    }
    let ids = receivedIds.concat(sentIds)
    
    console.log('received ids')
    console.log(receivedIds)
    console.log('sent ids')
    console.log(sentIds)
    //console.log(ids)

    if(ids.length > 0){
        const messagesCollection = db.collection('messages')
        const selectedMessages = await messagesCollection.find({_id: {$in: ids}}).toArray()
        //console.log(selectedMessages)
        selectedMessages.map(item => {
            if(item.sender === selectedUser.email){
                sentMessages.push(item)
            }else{
                receivedMessages.push(item)
            }
        })
    }

    console.log('received')
    console.log(receivedMessages)
    console.log('sent')
    console.log(sentMessages)

    client.close()
   // console.log('selected pets')
   // console.log(selectedPet)

    return{
        props:{
            receivedMsg: receivedMessages.map(item => {
                return{
                    id: item._id.toString(),
                    receiver: item.receiver,
                    sender: item.sender,
                    subject: item.subject,
                    text: item.msgText,
                    date: item.date,
                    status: item.status,
                    readAt: item.readAt || ''
                }
                
            }),
            sentMsg : sentMessages.map(item => {
                return{
                    id: item._id.toString(),
                    sender: item.sender,
                    receiver: item.receiver,
                    subject: item.subject,
                    text: item.msgText,
                    date: item.date,
                    status: item.status,
                    readAt: item.readAt || ''
                }
                
            }),
            revalidate: 60
        }
        
    }
}

export default MyMessagesPage

