import { useContext } from "react"
import { UserContext } from '../../../context/user-context'
import { ObjectId, MongoClient } from "mongodb"
import PetList from '../../../components/PetList/PetList'

const MyPetsPage = () => {
    const userCtx = useContext(UserContext)
    return(
        <>
            {!userCtx.user && <h1 className="my-4">Access Denied</h1>}
            {userCtx.user && <PetList pets={props.pets}/>}
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
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/pets?retryWrites=true&w=majority')
    const db = client.db()
    const petsCollection = db.collection('pets')
    const selectedPet = await petsCollection.findOne({user: ObjectId(userId)})
    client.close()
    console.log('selected pets')
    console.log(selectedPet)
    if(!selectedPet || selectedPet === {}){
        return{
            notFound:true
        }
    }
    return{
        props:{
            petData: {
                id: selectedPet._id.toString(),
                name: selectedPet.name,
                image: selectedPet.image,
                category: selectedPet.category,
                age: selectedPet.age,
                color: selectedPet.color,
                gender: selectedPet.gender
            }
        }
    }
}

export default MyPetsPage