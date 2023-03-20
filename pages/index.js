import Head from 'next/head'
import { MongoClient } from 'mongodb'
import NewList from '../components/Home/NewList'
import ActionsMenu from '../components/Home/ActionsMenu'

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Pet Adoption Center</title>
      </Head>
      <NewList pets={props.pets}/>
      <ActionsMenu />
    </>
  )
}

export async function getServerSideProps(context){
  const client = await MongoClient.connect(process.env.MONGODB_PETS_URI)
  const db = client.db()
  const petsCollection = db.collection('pets')
  const selectedPets = await petsCollection.find().limit(6).sort({'date':-1}).toArray()
  client.close()
  let foundPets = []
  selectedPets.map(selectedPet => {
    foundPets.push(
      {
        id: selectedPet._id.toString(),
        name: selectedPet.name,
        image: selectedPet.image,
        age: selectedPet.age,
        date: selectedPet.date.toString(),
        gender: selectedPet.gender,
        address: {
          city: selectedPet.address.city,
          state: selectedPet.address.state,
          country: selectedPet.address.country
        }
      }
    )
  })
  console.log(foundPets)
  return{
      props:{
          pets: foundPets
      }
  }
}

export default Home