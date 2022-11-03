import Head from "next/head"
import classes from './PetsList.module.css'

const ListHead = props => {
    let fixedCategory
    if(props.category){
        fixedCategory = props.category.filter(item => item !== 'all')
        if(fixedCategory.length < 1){
            fixedCategory = 'All pets'
        }else{
            fixedCategory = fixedCategory.join(',')
        }
    }else{
        fixedCategory = 'All pets'
    }
    
    
    return (
        <>
            {props.search && (
                <>
                    <Head>
                        <title>{props.search} - Pet Adoption Center</title>
                    </Head>
                    <h3 className={'text-center my-2 ' + classes.fontRoboto}>Search for <i>&quot;{props.search}&quot;</i></h3>
                </>
            )}

            {!props.search && 
                <>
                    <Head>
                        <title>{fixedCategory} - Pet Adoption Center</title>
                    </Head>
                    {fixedCategory === 'All pets' && <h3 className={'text-center my-4 ' + classes.fontRoboto}>All Pets</h3>}
                    {fixedCategory !== 'All pets' && <h3 className={'text-center my-4 ' + classes.fontRoboto}>Search in categories: <i>&quot;{fixedCategory}&quot;</i></h3>}
                </>
            }

        </>
    )
}

export default ListHead