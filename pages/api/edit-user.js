import {MongoClient, ObjectId} from 'mongodb'

export async function editUser(req,res){
        console.log('edit')
        const userData = req.body;
        const userId = new ObjectId(req.query.id)
        console.log(userData)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const usersCollection = db.collection('users')
        let message
        let status = ''
        if(!userData.password){
            const checkUser = await usersCollection.findOne({_id: {$ne: userId} ,email: userData.email})
            if(checkUser){
                message='Email already in use'
                status = 'error'
            }
        }
        if(status === ''){
            const result = await usersCollection.updateOne({_id: userId},{$set: userData})
            console.log(result.modifiedCount)
            if(result.modifiedCount > 0){
                message='The user was edited with success'
                status='sucess'
            }else{
                message='Error. No data was changed. Please, try again.'
                status='error'
            }        
        }
            client.close()
            res.status(201).json({message,status})
}

export default editUser