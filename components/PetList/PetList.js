import Row from 'react-bootstrap/Row';
import PetCard from './PetCard';
import ListHead from './ListHead';
import ListSort from './ListSort';
import PetsPagination from './PetsPagination';


const PetList = (props) => {
    console.log(props.pets)
    return (
        <>
            {props.mode === 'show' && <ListHead search={props.search} category={props.category}/>}
            

            <div className='d-block mx-auto px-4 my-4'>
                {!props.loading && props.pets.length > 0 &&
                <>
                <ListSort size={props.petsSize}/>

                <Row xs={1} md={2} lg={4} className="g-4 mx-auto justify-content-center" style={{maxWidth:'1000px'}}>
                    {props.pets.map( pet => (
                        <PetCard pet={pet} key={pet.id} mode={props.mode}/>
                    ))}  
                </Row>

                <PetsPagination size={props.petsSize} total={props.petsSize}/>        
                </>
                
                }
                {!props.loading && props.pets.length === 0 && <h3 className='text-center font-roboto'>No results found</h3>}  
            </div>      
        </>
      );
}

export default PetList