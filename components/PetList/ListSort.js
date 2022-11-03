import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import ListFilter from './ListFilter';

const ListSort = props => {
    const router = useRouter()
    const sortProds = (event) => {
        event.preventDefault()
        console.log(router)
        console.log(event.target.value)
        router.query.order = event.target.value
        router.push(router)
    }
    return(
        <>
        <div className="d-flex fex-wrap justify-content-between align-items-center mb-4 mx-auto" style={{maxWidth:'980px'}}>
                <span ><i>Found {props.size} pets</i></span>

                
                <div className='d-flex'>
                <ListFilter />
                <Form.Select aria-label="Sort by" style={{width:'auto'}} onChange={sortProds}>
                    <option value="new">Recently Added</option>
                    <option value="old">Oldest Added</option>
                    <option value="agedesc">Age: Oldest to Newest</option>
                    <option value="agedeasc">Age: Newest to Oldest</option>
                </Form.Select>
                </div>
                
        </div>
        </>
    )
}

export default ListSort