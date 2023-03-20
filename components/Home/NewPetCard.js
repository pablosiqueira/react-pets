import Image from "react-bootstrap/Image"
import Link from "next/link"
import classes from './NewList.module.css'
import { useState } from "react"
import {BsGenderFemale,BsGenderMale} from 'react-icons/bs'

const NewPetCard = props => {
    const [imgError,setImgError] = useState(false)
    const dateNow = new Date()
    let addedAt = new Date(props.pet.date)
    console.log(props.pet.date)
    const ageDif = Math.ceil((dateNow - addedAt) / (1000 * 3600 * 24)) //in days
    /*let ageToShow
    if (ageDif > 30){
        ageToShow = addedAt.toLocaleDateString()
    }else{
        ageToShow = ageDif + ' days ago'
    }*/
    return (
        <>
            <Link href={'/pet/' + props.pet.id}>
                <div className={"border rounded d-inline-flex flex-wrap mx-2 my-2 p-1 " + classes.newPetCardBody} >
                        <Image src={imgError ? './pets.png' : props.pet.image} className={classes.newPetImg} fluid
                        onError={()=>setImgError(true)} alt={props.pet.name}/>
                    <div className={classes.newPetCardText}>
                        <p>{props.pet.name} - {props.pet.gender === 'female' ? <BsGenderFemale size='1.2rem' className="pb-1 fw-bold"/> : <BsGenderMale size='1.2rem' className="pb-1 fw-bold"/>}</p>
                        <p>{props.pet.address.city}/{props.pet.address.state}/{props.pet.address.country}</p>
                        <p><i>{ageDif.toLocaleString() + ' days ago'}</i></p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default NewPetCard