import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import {FiFilter} from 'react-icons/fi'
import ListFilterForm from './ListFilterForm';

const ListFilter = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <Button variant="outline-dark" onClick={handleShow} className="mx-2">
        Filters <FiFilter />
        </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListFilterForm onFiltered={handleClose}/>
        </Offcanvas.Body>
      </Offcanvas>
        </>
    )
}

export default ListFilter