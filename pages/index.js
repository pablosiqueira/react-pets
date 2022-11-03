//import styles from '../styles/Home.module.css'
import Head from 'next/head'
import AddedList from '../components/Home/AddedList'
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
  const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/pets?retryWrites=true&w=majority')
  const db = client.db()
  const petsCollection = db.collection('pets')
  const selectedPets = await petsCollection.find().limit(6).sort({'date':-1}).toArray()
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
        age: selectedPet.age,
        date: selectedPet.date,
        gender: selectedPet.gender,
        address: {
          city: selectedPet.address.city,
          state: selectedPet.address.state,
          country: selectedPet.address.country
        }
      }
    )
  })
  return{
      props:{
          pets: foundPets
      }
  }
}

export default Home