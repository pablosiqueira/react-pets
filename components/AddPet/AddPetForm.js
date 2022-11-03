import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useState,useRef,useContext } from 'react';
import ImageForm from './ImageForm';
import MessageModal from '../UI/MessageModal';
import classes from './Forms.module.css'
import { UserContext } from '../../context/user-context';

const AddPetForm = props => {
    const userCtx = useContext(UserContext)

    const [name,setName] = useState(props.pet ? props.pet.name : '')
    const nameInputHandler = (event) => {
        setName(event.target.value)
    }

    const imageRef = useRef()
    const [image,setImage] = useState(props.pet ? props.pet.image : '')
    const imageInputHandler = (event) => {
        setImage(event.target.value)
        setImgError(false)
    }

    const [imgError, setImgError] = useState(false)

    const [breed,setBreed] = useState(props.pet ? props.pet.breed : '')
    const breedInputHandler = (event) => {
        setBreed(event.target.value.toLowerCase())
    }

    const breedCheck = useRef()

    const setBreedStray = (event) => {
        const checked = event.target.checked
        console.log(event.target.checked)
        if (checked){
            setBreed('Stray/Unknown/Mixed-Breed')
        }else{
            setBreed('')
        }
    }

    const [age,setAge] = useState(props.pet ? props.pet.ageNumber : '')
    const ageInputHandler = (event) => {
        setAge(event.target.value)
    }

    const [ageMeasure,setAgeMeasure] = useState(props.pet ? props.pet.ageMeasure : '')
    const ageMeasureInputHandler = (event) => {
        setAgeMeasure(event.target.value)
    }

    const [color,setColor] = useState(props.pet ? props.pet.color : '')
    const colorInputHandler = (event) => {
        setColor(event.target.value)
    }

    const [gender,setGender] = useState(props.pet ? props.pet.gender : '')
    const genderInputHandler = (event) => {
        setGender(event.target.value)
    }

    const [category, setCategory] = useState(props.pet ? props.pet.category : '')
    const categoryInputHandler = (event) => {
        setCategory(event.target.value)
    }

    const [description, setDescription] = useState(props.pet ? props.pet.description : '')
    const descriptionInputHandler = (event) => {
        setDescription(event.target.value)
    }

    const [modalShow, setModalShow] = useState(false);

    const clearInputs = () => {
        setName('')
        setBreed('')
        setColor('')
        setGender('')
        setImage('')
        setCategory('')
        setAge('')
        setAgeMeasure('')
        setDescription('')
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(imgError){
            imageRef.current.focus()
        }else{
            const date = new Date()
            //const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

            const data = {
                name,
                image,
                age: {
                    number: age,
                    measure: ageMeasure
                },
                breed,
                color,
                gender,
                category,
                date,
                user: userCtx.user._id,
                userName: userCtx.user.name,
                userEmail: userCtx.user.email,
                address: {
                    city: userCtx.user.address.city,
                    state: userCtx.user.address.state,
                    country: userCtx.user.address.country
                },
                description
            }
            console.log(data)
            if(props.mode === 'add'){
                props.onAddPet(data)
                clearInputs()
                event.target.reset()
            }else if(props.mode === 'edit'){
                props.onEditPet(data)
            }
            setModalShow(true)
            setTimeout(()=>{setModalShow(false)}, 3000);
        }
        
    }

    return(
        <>
            <h1 className='my-4 text-capitalize text-center'>{props.mode} Pet</h1>

            <Form className={'d-block mx-auto ' + classes.fontRoboto} onSubmit={submitForm} style={{maxWidth:'500px'}}>

            <FloatingLabel className="mb-3" controlId="name" label='Name'>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={nameInputHandler} required />
            </FloatingLabel>

            <ImageForm imageRef={imageRef} onInputImage={imageInputHandler} imgUrl={image} errorHandler={setImgError} imgError={imgError}/>

            <FloatingLabel className="mb-3" controlId="floatingSelect" label="Category">
                <Form.Select required defaultValue={category} onChange={categoryInputHandler}>
                    <option value=""></option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                </Form.Select>
            </FloatingLabel>

            {breed !== 'Stray/Unknown/Mixed-Breed' && <FloatingLabel className="mb-3" controlId="breed" label='Breed'>
                 <Form.Control type="text" placeholder="Enter breed" value={breed} onChange={breedInputHandler} required/>
            </FloatingLabel>}

            <Form.Check className='mb-3' type='checkbox' label='Stray/Unknown/Mixed-Breed' 
            onChange={setBreedStray} ref={breedCheck} 
            checked={breed === 'Stray/Unknown/Mixed-Breed' ? true : false}/>

            <Row className="g-2 mb-3">
                <Col md>
                    <FloatingLabel label="Age">
                    <Form.Control type="number" step='1' min='1' value={age} onChange={ageInputHandler}/>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Select age measurement"
                    >
                    <Form.Select aria-label="Age measurement" defaultValue={ageMeasure} onChange={ageMeasureInputHandler}>
                        <option value=""></option>
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <FloatingLabel className="mb-3" controlId="colors" label='Colors - Ex:(color 1, color 2,...)'>
                <Form.Control type="text" placeholder="Enter colors Ex:(color 1, color 2,...)" value={color} onChange={colorInputHandler} required/>
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="floatingSelect" label="Gender">
                <Form.Select required defaultValue={gender} onChange={genderInputHandler}>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Description(optional)">
            <Form.Control
            as="textarea"
            placeholder="Write a description here"
            onChange={descriptionInputHandler}
            style={{ height: '100px' }}
            />
            </FloatingLabel>

            <div className='d-grid'>
                <Button variant="dark" type="submit" className='my-4'>Submit</Button>
            </div>

            <MessageModal show={modalShow} onHide={() => setModalShow(false)} message={props.modalMessage}/>

            </Form>
        </>  
    )
}

export default AddPetForm