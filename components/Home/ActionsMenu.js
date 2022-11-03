import Link from "next/link"
import {HiOutlineShoppingBag} from 'react-icons/hi'
import {FaUserCircle, FaSearch} from 'react-icons/fa'
import {MdOutlineEditNote, MdPlaylistAdd} from 'react-icons/md'
import classes from './Home.module.css'
import Image from "react-bootstrap/Image"

const ActionsMenu = props => {
    return(
    <>
        <section className={"d-flex text-center flex-wrap pt-2 " + classes.actionsSection}>
            <Link href='/pets/all'>
                <a className={classes.actionLink} variant="outline-secondary">
                    <FaSearch size='5rem'/>
                    <p>Browse Pets</p> 
                </a>
            </Link>

            <Link href='/user'>
              <a className={classes.actionLink} variant="outline-dark">
                <FaUserCircle size='5rem'/>
                <p>User Area</p>
              </a>
            </Link>

      </section>
      <section className={classes.bottomDiv}>
        <Image src='/petGroup.png' className="d-block mx-auto py-4" alt='group of pets'/>
      </section>
    </>
    )
}

export default ActionsMenu