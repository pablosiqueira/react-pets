import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import classes from './PetsList.module.css'
import {FaRegEdit} from 'react-icons/fa'
import { useState } from 'react';
import {BsGenderFemale,BsGenderMale} from 'react-icons/bs'

const PetCard = props => {
    console.log(props.pet)
    const [imgError,setImgError] = useState(false)
    let linkHref = (props.mode === 'show') ?  ('/pet/' + props.pet.id) : ('/user/my-pets/edit/' + props.pet.id)
    const dateNow = new Date()
    let addedAt = new Date(props.pet.date)
    const ageDif = Math.ceil((dateNow - addedAt) / (1000 * 3600 * 24)) //in days
    let ageToShow
    if (ageDif > 30){
        ageToShow = addedAt.toLocaleDateString()
    }else{
        ageToShow = ageDif + ' days ago'
    }

    return(
        <Link href={linkHref}>
            <Col className={classes.pointer}>
                <Card className={classes.prodCard}>
                    <Card.Img variant="top" src={imgError ? '/img_not_found.png' : props.pet.image} className={classes.prodImg}
                    onError={()=>setImgError(true)}/>
                    <Card.Body className='text-center'>
                        <Card.Title className={classes.cardTitle}>
                            {props.pet.name} - 
                            {props.pet.gender === 'female' ? 
                                <BsGenderFemale size='1.2rem' className="pb-1 fw-bold"/> : 
                                <BsGenderMale size='1.2rem' className="pb-1 fw-bold"/>}
                        </Card.Title>
                        <Card.Text className={classes.cardText}>
                            {props.mode === 'show' && <><b>Age:</b> {props.pet.ageNumber} {props.pet.ageMeasure} <br/></>}
                            {props.mode === 'show' && <span>{props.pet.city}/{props.pet.state} - {props.pet.country}</span>}
                            {props.mode === 'edit' && <FaRegEdit size='1.5rem' className='mb-3'/>}
                        </Card.Text>
                        <Card.Footer className={"text-muted " + classes.cardFooter}>Added: {ageToShow}</Card.Footer>
                    </Card.Body>
                    
                </Card>
            </Col>
        </Link>
    )
}
export default PetCard