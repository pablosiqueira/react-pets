import {MongoClient} from 'mongodb'
import { ObjectId } from 'mongodb';

export async function EditPet(req,res){
        //console.log('edit')
        const petId = new ObjectId(req.query.id)
        //console.log(req.query.id)
        let petData = req.body;
        petData.age.number = parseFloat(petData.age.number)
        //console.log(req.body)
        const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
        const db = client.db()
        const petsCollection = db.collection('pets')
        const result = await petsCollection.updateOne({_id:petId},{$set: petData})
            console.log(result)
            client.close()
            res.status(201).json({message: 'inserted!'})
}

export default EditPet