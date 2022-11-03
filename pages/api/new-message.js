import {MongoClient, ObjectId} from 'mongodb'

export async function newMessage(req,res){
        console.log('create message')
        let resultMessage = ''
        let status = ''
        let messageData = req.body
        console.log(req.body)
        const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/pets?retryWrites=true&w=majority')
        const db = client.db()
        const usersCollection = db.collection('users')
        //check if user exists
        console.log(messageData.email)
        const checkUser = await usersCollection.findOne({email: messageData.receiver})
        if(!checkUser){
            resultMessage = 'User not found'
            status = 'error'
        }else{
            //create message
            const messagesCollection = db.collection('messages')
            const addMessageToCollection = await messagesCollection.insertOne(messageData)
            //add message id to users
            const addMessageToSender = await usersCollection.updateOne({email:messageData.sender},{$push: {'messages.sent' : ObjectId(addMessageToCollection.insertedId)}})
            const addMessageToReceiver = await usersCollection.updateOne({email:messageData.receiver},
                {$push: {'messages.received' : ObjectId(addMessageToCollection.insertedId)}})
            console.log(addMessageToSender)
            console.log(addMessageToReceiver)
            resultMessage = 'The message was sent'
            status = 'success'
        }
        
        client.close()
        res.status(201).json({status, message: resultMessage})
}

export default newMessage