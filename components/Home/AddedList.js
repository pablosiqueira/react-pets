import Carousel from 'react-bootstrap/Carousel'
import classes from './Home.module.css'

const AddedList = (props) => {
    console.log(props.pets)
    return (<>
    <Carousel >
    {props.pets && props.pets.map(pet => {
        return (
            <Carousel.Item key={pet.id}>
            <img
            className={"d-block w-100 " + classes.carrouselImg}
            src={pet.image}
            alt={pet.name}
            />
            <Carousel.Caption>
            <h3>{pet.name}</h3>
            <p>{pet.address.city}/{pet.address.state} - {pet.address.country}</p>
            </Carousel.Caption>
            </Carousel.Item>
            )
    })}
    </Carousel>
    </>)
}

export default AddedList