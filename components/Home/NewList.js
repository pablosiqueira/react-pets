import NewPetCard from "./NewPetCard" 
import classes from './NewList.module.css'

const NewList = props => {
    console.log('new list')
    console.log(props.pets)
    return (
        <>
            <h1 className={"mb-0 text-center " + classes.newPetTitle}>Recently Added</h1>
            <div className={"d-block mx-auto py-2 " + classes.newPetBody}>
                <div className="d-flex flex-wrap justify-content-center">
                {props.pets.map(pet => {
                        return <NewPetCard pet={pet} key={pet.id}/>
                    })}
                </div>
            </div>
            <h1 className={"mb-0 text-center " + classes.newPetTitle} style={{color:'#9E0059'}}>Recently Added</h1>
        </>
    )
}

export default NewList