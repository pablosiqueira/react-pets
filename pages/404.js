import Button from "react-bootstrap/Button"
import Head from "next/head"
import Image from "react-bootstrap/Image"
import { useRouter } from "next/router" 
import {TiArrowBack} from 'react-icons/ti'

const NotFoundPage = () => {
    const router = useRouter()
    return(
        <>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <h1 className="text-center my-4">Page Not Found</h1>
            <div className="d-block mx-auto text-center my-4">
                <div><Image src='/haski_dog_animal_15968.png' alt='Dog with a hat'/></div>
                <Button onClick={router.back} variant="danger" className="my-4"><TiArrowBack size='1.5rem'/> Go Back</Button>
            </div>
        </>
    )
}

export default NotFoundPage