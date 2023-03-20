import {MongoClient} from 'mongodb'
import { compare } from 'bcryptjs';

export async function login(req,res){
        const data = req.body
        const email = data.email
        const password = data.password
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        let userCollection
        let message
        let returnData
        userCollection = db.collection('users').findOne({email},{name:1, email:1, address:1})
        const result = await userCollection
        console.log(result)
        if(result){
                const isMatch = await compare(password,result.password)
                if(isMatch){
                        message = 'Success'
                        returnData = result
                }else{
                        message = 'Wrong Password'
                }
        }else{
                message = 'User not found'
        }
        console.log(message)
        console.log(returnData)
        client.close()
        res.status(201).json({message, data: returnData})
}

export default login