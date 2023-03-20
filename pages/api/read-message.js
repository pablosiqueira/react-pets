import {MongoClient, ObjectId} from 'mongodb'

export async function readMessage(req,res){
        console.log('read message')
        let messageData = req.body
        console.log(req.body)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const messagesCollection = db.collection('messages')
        const getMessage = await messagesCollection.findOne({_id: new ObjectId(messageData.id)})
        console.log(getMessage)
        if(getMessage.status === 'unread'){
            const updateMessage = await messagesCollection.updateOne({_id: new ObjectId(messageData.id)}, {$set:{status:'read', 'readAt': messageData.date}})
        }
        //add message id to users
        client.close()
        //console.log('/user/my-messages/' + messageData.userId)
        //await res.revalidate('/user/my-messages/' + messageData.userId)
        res.status(201).json({message:'done'})
}

export default readMessage