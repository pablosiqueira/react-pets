import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from './PetsList.module.css'

const PetsPagination = props => {
    const router = useRouter()

    const [active, setActive] = useState(()=>{
        if(!router.query.page){
            return 1
        }else{
            return router.query.page
        }
    })

    let items = [];

    let numOfPages = parseInt((props.size/20))
        if(props.size%20 > 0){
            numOfPages++
        }

    let lastLimit
    if(active === numOfPages){
        lastLimit = props.total
    }else{
        lastLimit = (20*(active-1) + 1) + 19
    }
    if(numOfPages < 20){
        lastLimit = props.total
    }


    for (let number = 1; number <= numOfPages; number++) {
    items.push(  
    <Pagination.Item className={
        ((+number === +active || (+number < +active + 5 && +number > +active) || (number+5 > numOfPages)) ? 
        ' ' : 'd-none ') + (+number === +active ? classes.backRed : classes.textDark )}
        key={number} active={number === active} onClick={() => changePage(number)}>
      {number}
    </Pagination.Item>,
    );

    }

    const changePage = (number) => {
        setActive(number)
        router.query.page = number
        router.push(router)
    }


    return (
        <>
        <div className="d-flex fex-wrap justify-content-between align-items-center my-4 mx-auto" style={{maxWidth:'980px'}}>
            <span>{20*(active-1) + 1} - {lastLimit} of {props.total} pets</span>
              
            <Pagination className={classes.textDark}>
                <Pagination.First onClick={() => changePage(1)}/>    
                <Pagination.Prev onClick={() => changePage(parseFloat(active) - parseFloat(1))}/>
                {items}
                <Pagination.Next onClick={() => changePage(parseFloat(active) + parseFloat(1))}/>
                <Pagination.Last onClick={() => changePage(numOfPages)}/>
            </Pagination>
        </div>
        </>
    )
}

export default PetsPagination