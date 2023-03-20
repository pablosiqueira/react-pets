import {MongoClient} from 'mongodb'

export async function createUser(req,res){
        console.log('adding')
        const userData = req.body;
        console.log(userData)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const usersCollection = db.collection('users')
        const checkUser = await usersCollection.findOne({email: userData.email})
        console.log(checkUser)
        let message
        let status
        let newId
        if(checkUser){
            message='Email already in use'
            status = 'error'
            newId = ''
        }else{
            const result = await usersCollection.insertOne(userData)
            console.log(result)
            message='The user was created with success'
            status='sucess'
            newId = result.insertedId.toString()
        }
            client.close()
            res.status(201).json({message,status,newId})
            //res.status(201).json({message:'test',status:'test'})
}

export default createUser