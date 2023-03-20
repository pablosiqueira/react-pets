import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import PetList from "../../../../components/PetList/PetList"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../../../context/user-context"

const MyPetsPage = (props) => {
    const router = useRouter()
    const userCtx = useContext(UserContext)
    if (router.isFallback) {
        return <h1 className="text-center my-4">Loading...</h1>
    }
    return <>
    {!userCtx.user && <h1 className="my-4">Access Denied</h1>}
    {userCtx.user && <>
        <Head>
        <title>My Pets</title>
        </Head>
        <PetList pets={props.pets} petsSize={props.petsSize} mode='edit'/>
    </>}
    </>
}

export async function getStaticPaths(context){
    //fetch data for a single meetup
    const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
    const db = client.db()
    const petsCollection = db.collection('users')
    const users = await petsCollection.find({},{_id: 1}).toArray()
    client.close()

    return {
        paths: users.map(user => ({
            params: {
                userId: user._id.toString()
            }})),
        fallback: true    
    }
}

export async function getStaticProps({params,query}){
    const userId = params.userId
    if(!ObjectId.isValid(userId) || !userId){
        return{
            notFound:true
        }
    }
    const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
    const db = client.db()
    const petsCollection = db.collection('pets')

    const selectedSize = await petsCollection.countDocuments({user:userId})
    console.log('size: ' + selectedSize)

    let sortQuery = {_id:-1}
    if(query && query.order){
        if(query.order === 'ageasc'){
            sortQuery = {"age.measure":-1,"age.number":-1}
          }
          if(query.order === 'agedesc'){
            sortQuery = {"age.measure":1,"age.number":1}
          }
          if(query.order === 'old'){
            sortQuery = {"date":1}
          }
          if(query.order === 'new'){
            sortQuery = {"date":-1}
          }
    }

  let currentPage = 1
  if(query && query.page){
    currentPage = query.page
  }  


  const selectedPets = await petsCollection.find({user: userId}).sort(sortQuery).skip((currentPage - 1)*20).limit(20).toArray()
  client.close()
  console.log('selected pets')
  console.log(selectedPets)
  let foundPets = []
  selectedPets.map(selectedPet => {
    foundPets.push(
      {
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
                description: selectedPet.description
      }
    )
  })
  return{
      props:{
          pets: foundPets,
          petsSize: selectedSize
      }
  }
}

export default MyPetsPage