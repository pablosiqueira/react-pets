import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Image from "react-bootstrap/Image"
import {BiError} from 'react-icons/bi'

const ImageForm = props => {
    return(
        <>
        <FloatingLabel className="mb-3" controlId="imgURL" label='Image URL'>
            <Form.Control ref={props.imageRef} type="url" placeholder="Enter image url" onChange={props.onInputImage} value={props.imgUrl} required/>
        </FloatingLabel>
        {props.imgUrl && props.imgUrl !== '' && !props.imgError && <Image className="d-block mx-auto my-2 border border-secondary" 
        src={props.imgUrl}
        onError={()=>props.errorHandler(true)} 
        style={{maxHeight: '15rem', maxWidth: 'inherit'}} alt='pet preview image'/>}
        {props.imgError && props.imgUrl !== '' &&<p className="text-center text-danger"><BiError /> Image not found</p>}
        </>
    )
}

export default ImageForm