import AddPetForm from "../../components/AddPet/AddPetForm"
import { useContext } from "react"
import { UserContext } from "../../context/user-context"
import Head from "next/head"

const AddPetPage = () => {
    const userCtx = useContext(UserContext)

    async function addPetHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/add-pet',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
    }

    return(
        <>
            <Head>
                <title>Add Pet</title>
            </Head>
            {!userCtx.user && <h1 className="my-4">Access Denied</h1>}
            {userCtx.user && <AddPetForm mode='add' modalMessage='Pet added to the database' onAddPet={addPetHandler}/>}
        </>    
    )
}

export default AddPetPage