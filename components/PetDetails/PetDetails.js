import classes from './PetDetails.module.css'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import CategoryBreadcrumb from './CategoryBreadcrumb';
import Image from 'react-bootstrap/Image'
import Link from 'next/link';
import { useContext } from "react"
import { UserContext } from "../../context/user-context"

const PetDetails = (props) => {
    const [imgError,setImgError] = useState(false)
    const userCtx = useContext(UserContext)

    return (
        <>

        <CategoryBreadcrumb sections={[props.pet.category, props.pet.gender, props.pet.country, props.pet.state, props.pet.city]} lastItem={props.pet.name}/>

        <div className='d-flex justify-content-center flex-wrap mb-4'>
            <div className='my-2 mx-2'>
                <Image src={imgError ? '/img_not_found.png' : props.pet.image} fluid style={{maxHeight: '15rem'}} 
                onError={()=>setImgError(true)} alt={props.pet.name}/>
            </div>
            <div className={classes.description}>
                <h3>{props.pet.name}</h3>
                <h5><b>Gender: </b>{props.pet.gender}</h5>
                <h5><b>Age: </b>{props.pet.ageNumber} {props.pet.ageMeasure}</h5>
                <h5><b>Breed: </b>{props.pet.breed}</h5>
                <h5><b>Location: </b>{props.pet.city}/{props.pet.state} - {props.pet.country}</h5>
                <h5><b>Announced by: </b><Link href={'/user/profile/' + props.pet.userId}>{props.pet.userName}</Link></h5>
                {(userCtx.user && (props.pet.userId !== userCtx.user._id)) && <Link href={'/user/new-message?receiver=' + props.pet.userEmail + '&subject=About pet: ' + props.pet.name}>
                    <Button className={'mt-2 ' + classes.btnRed} size="lg">Send Message</Button></Link>}
                {(userCtx.user && (props.pet.userId === userCtx.user._id)) && <Link href={'/user/my-pets/edit/' + props.pet.id}>
                    <Button className={'mt-2 ' + classes.btnRed} size="lg">Edit</Button></Link>}
                {!userCtx.user && 
                <Link href='/user'><h5>Login or create account to contact the announcer.</h5></Link>}    
            </div>
        </div>
        {props.pet.description !== '' && <div className='text-center'>
            <h3>About</h3>
            <p>{props.pet.description}</p>
        </div>}                         
        </>
    )
}

export default PetDetails