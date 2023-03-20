import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import PetDetails from "../../components/PetDetails/PetDetails"
import { useRouter } from "next/router"

const PetDetail = (props) => {
    const router = useRouter()
    if (router.isFallback) {
        return <h1 className="text-center my-4">Loading...</h1>
    }
    return <>
    <Head>
        <title>{props.petData.name}</title>
    </Head>
    <PetDetails pet={props.petData}/>
    </>
}

export async function getStaticPaths(context){
    //fetch data for a single meetup
    const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
    const db = client.db()
    const petsCollection = db.collection('pets')
    const pets = await petsCollection.find({},{_id: 1}).toArray()
    client.close()

    return {
        paths: pets.map(pet => ({
            params: {
                petId: pet._id.toString()
            }})),
        fallback: true    
    }
}

export async function getStaticProps(context){
    const petId = context.params.petId
    if(!ObjectId.isValid(petId) || !petId){
        return{
            notFound:true
        }
    }
    const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
    const db = client.db()
    const petsCollection = db.collection('pets')
    const selectedPet = await petsCollection.findOne({_id: ObjectId(petId)})
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
                breed: selectedPet.breed,
                ageNumber: selectedPet.age.number,
                ageMeasure: selectedPet.age.measure,
                category: selectedPet.category,
                gender: selectedPet.gender,
                city: selectedPet.address.city,
                state: selectedPet.address.state,
                country: selectedPet.address.country,
                date: selectedPet.date,
                description: selectedPet.description,
                userName: selectedPet.userName,
                userEmail: selectedPet.userEmail,
                userId: selectedPet.user
            }
        }
    }
}

export default PetDetail