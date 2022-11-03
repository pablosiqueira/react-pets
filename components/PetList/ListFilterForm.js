import Form from 'react-bootstrap/Form';
import { Router, useRouter } from 'next/router';
import { useState, useRef } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const ListFilterForm = props => {
    const router = useRouter()
    //console.log(router)

    const catRef = useRef()
    const dogRef = useRef()

    const category = router.query.filters[0]
    const genderQuery = router.query.filters[1]
    const countryQuery = router.query.filters[2]
    const stateQuery = router.query.filters[3]
    const cityQuery = router.query.filters[4]

    const [gender,setGender] = useState(!genderQuery ? 'all' : genderQuery)
    const genderInputHandler = (event) => {
        setGender(event.target.value)
    }

    const [country,setCountry] = useState(countryQuery ? countryQuery : 'all')
    const countryInputHandler = (event) => {
        setCountry(event.target.value)
    }

    const [state,setState] = useState(stateQuery ? stateQuery : 'all')
    const stateInputHandler = (event) => {
        setState(event.target.value)
    }

    const [city,setCity] = useState((cityQuery ? cityQuery : 'all'))
    const cityInputHandler = (event) => {
        setCity(event.target.value)
    }

    const submitFilter = (event) => {
        event.preventDefault()
        let selectedCategory = 'all'
        if(!catRef.current.checked && dogRef.current.checked){
            selectedCategory = 'dog'
        }else{
            if(catRef.current.checked && !dogRef.current.checked){
                selectedCategory = 'cat'
            }
        }
        router.query.filters[0] = selectedCategory
        router.query.filters[1] = gender.toLowerCase()
        router.query.filters[2] = country.toLowerCase()
        router.query.filters[3] = state.toLowerCase()
        router.query.filters[4] = city.toLowerCase()
        router.push(router)
        props.onFiltered()
    }

    return (
        <>
        <Form onSubmit={submitFilter}>
        {['cat', 'dog'].map(item => (
        <div key={item} className="mb-3">
          <Form.Check 
            type='checkbox'
            id={item + '-check'}
            label={item}
            value={item}
            ref={item === 'cat' ? catRef : dogRef}
            defaultChecked={category === 'all' || category === item}
          />
          </div>))}

        <FloatingLabel className='mb-2' label="Gender">
            <Form.Select aria-label="Floating label select example" defaultValue={gender} onChange={genderInputHandler}>
            <option value='all'>all</option>
            <option value="female">female</option>
            <option value="male">male</option>
            </Form.Select>
        </FloatingLabel>

        <FloatingLabel className='mb-2' label="Country">
            <Form.Control type="text" value={country} onChange={countryInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className='mb-2' label="State (UF)">
            <Form.Control type="text" value={state} onChange={stateInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className='mb-2' label="City">
            <Form.Control type="text" value={city} onChange={cityInputHandler} required/>
        </FloatingLabel>

        <Button type='submit' variant="outline-dark">Filter Results</Button>
        </Form>
        </>
    )
}

export default ListFilterForm