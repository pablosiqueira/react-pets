import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import LoadingScreen from '../../../../components/UI/LoadingScreen'
import AddPetForm from "../../../../components/AddPet/AddPetForm"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../../../context/user-context"


const EditPetPage = (props) => {
    const userCtx = useContext(UserContext)
    const router = useRouter()
    async function editPetHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/edit-pet?id=' + props.petData.id,{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
    }

    if (router.isFallback) {
        return (
        <>
        <Head>
            <title>Edit</title>
        </Head>
        <LoadingScreen />
        </>
        )
    }

    return <>
    <Head>
        <title>Edit - {props.petData.name}</title>
    </Head>
    {((userCtx.user && props.petData && props.petData.user !== userCtx.user._id) || !userCtx.user) && <h1 className="text-center my-4">Access Denied</h1>}
    {(userCtx.user && props.petData && props.petData.user === userCtx.user._id) && 
    <AddPetForm onEditPet={editPetHandler} pet={props.petData} mode='edit' modalMessage='Pet edited with success'/>}
    </>
}

export async function getStaticPaths(context){
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
    const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
    const db = client.db()
    const petsCollection = db.collection('pets')
    const selectedPet = await petsCollection.findOne({_id: ObjectId(petId)})
    client.close()

    if(!selectedPet){
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
                ageNumber: selectedPet.age.number,
                ageMeasure: selectedPet.age.measure,
                breed: selectedPet.breed,
                color: selectedPet.color,
                category: selectedPet.category,
                gender: selectedPet.gender,
                city: selectedPet.address.city,
                state: selectedPet.address.state,
                country: selectedPet.address.country,
                date: selectedPet.date,
                description: selectedPet.description,
                user: selectedPet.user
            }
        }
    }
}

export default EditPetPage