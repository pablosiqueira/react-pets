import { useRouter } from 'next/router';
import PetList from '../../components/PetList/PetList';
import { MongoClient} from "mongodb"

const PetsPage = (props) => {
    const router = useRouter();
    const terms = router.query.filters;
    const searchTerm = router.query.search

    return (
      <>
        <PetList pets={props.pets} category={terms} search={searchTerm} petsSize={props.petsSize} mode='show'/>
      </>  
    )
}

export async function getServerSideProps({params, query}){
  console.log(query)
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const petsCollection = db.collection('pets')
  let searchTerms = {}
  function diacriticSensitiveRegex(string = '') {
    return string.replace(/a/g, '[a,á,à,ä,â]')
       .replace(/e/g, '[e,é,ë,è]')
       .replace(/i/g, '[i,í,ï,ì]')
       .replace(/o/g, '[o,ó,ö,ò]')
       .replace(/u/g, '[u,ü,ú,ù]')
       .replace(/c/g, '[c,ç]');
  }
  if(params.filters){
    const category = params.filters[0]
    const gender = params.filters[1]
    const country = params.filters[2]
    const state = params.filters[3]
    const city = params.filters[4]
    
    if(category && category !== 'all'){
      searchTerms = {...searchTerms, category}
    }
    if(gender && gender !== 'all'){
      searchTerms = {...searchTerms, 'gender': gender.toLowerCase()}
    }
    if(country && country != 'all'){
      searchTerms = {...searchTerms, 'address.country': new RegExp(diacriticSensitiveRegex(country),'i')}
    }
    if(state && state != 'all'){
      searchTerms = {...searchTerms, 'address.state': new RegExp(diacriticSensitiveRegex(state),'i')}
    }
    if(city && city != 'all'){
      searchTerms = {...searchTerms, 'address.city': new RegExp(diacriticSensitiveRegex(city),'i')}
    }
  }

  if(query.search){
    const word = new RegExp(query.search,'i')
    searchTerms = {...searchTerms, name: word }
  }

  if(query.user){
    searchTerms = {...searchTerms, user: query.user }
  }

  console.log(searchTerms)
  const selectedSize = await petsCollection.countDocuments(searchTerms)
  console.log('size: ' + selectedSize)
  let sortQuery = {_id:-1}
    if(query.order === 'ageasc'){
      sortQuery = {"age.measure":1,"age.number":1}
    }
    if(query.order === 'agedesc'){
      sortQuery = {"age.measure":-1,"age.number":-1}
    }
    if(query.order === 'old'){
      sortQuery = {"date":1}
    }
    if(query.order === 'new'){
      sortQuery = {"date":-1}
    }

  let currentPage = 1
  if(query.page){
    currentPage = query.page
  }  
  console.log(query.order)  
  const selectedPets = await petsCollection.find(searchTerms).sort(sortQuery).skip((currentPage - 1)*20).limit(20).toArray()
  let recievedPets = []
  selectedPets.map(selectedPet => {
    recievedPets.push({
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
                date: selectedPet.date.toString(),
                description: selectedPet.description
    })
  })
  console.log(selectedPets)
  client.close() 

  return{
      props:{
          pets: recievedPets,
          petsSize: selectedSize
      }
  }
}





export default PetsPage