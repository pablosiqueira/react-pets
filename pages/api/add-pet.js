import {MongoClient, ObjectId} from 'mongodb'

export async function addPet(req,res){
        console.log('adding')
        let petData = req.body
        petData.age.number = parseFloat(petData.age.number)
        const userId = new ObjectId(petData.user)
        const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/pets?retryWrites=true&w=majority')
        const db = client.db()
        const petsCollection = db.collection('pets')
        const usersCollection = db.collection('users')
        const addToPetCollection = await petsCollection.insertOne(petData)
        const addPetToUser = await usersCollection.updateOne({_id:userId},{$push: {pets : ObjectId(addToPetCollection.insertedId)}})
        console.log(addPetToUser)
        client.close()
        res.status(201).json({message: 'Success'})
}

export default addPet