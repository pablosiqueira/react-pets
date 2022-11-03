import classes from './ProductDetails.module.css'

const TechnicalDetails = props => {
    return(
        <div className={'mx-2 d-block mx-auto ' + classes.fontRoboto} style={{maxWidth:'700px'}}>
            <div className='d-flex flex-column'>
                <h5 className='mx-2'>Technical Details</h5>
                <div className='d-flex flex-wrap text-capitalize' style={{justifyContent:'space-between'}}>
                    <div className='mx-2'>
                        <p><b>Name: </b>{props.product.name}</p>
                        <p><b>Ref: </b>{props.product.id}</p>
                    </div>
                    <div className='mx-2'>
                        <p><b>Brand: </b>{props.product.brand}</p>
                        <p><b>Gender: </b>{props.product.gender}</p>
                    </div>
                    <div className='mx-2'>
                        <p><b>Category: </b>{props.product.category}</p>
                        <p><b>Sport: </b>{props.product.sport}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TechnicalDetails