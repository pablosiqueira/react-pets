import Spinner from "react-bootstrap/Spinner"
import classes from './UI.module.css'

const LoadingScreen = props => {
    return (
        <div className="my-4 text-center d-block mx-auto">
            <Spinner animation="border" role="status" />
            <p className={classes.fontRoboto}>Loading...</p>
        </div>
    )
}

export default LoadingScreen