import Nav from 'react-bootstrap/Nav';
import classes from './Home.module.css'

const CategoriesBar = () => {
    const ctgs = ['all','cat','dog']
    return (<Nav className={classes.ctgbar} variant="pills" defaultActiveKey="/">
        {
            ctgs.map(item => {
                return <Nav.Item key={item}>
                <Nav.Link href={"/pets/" + item} className={classes.ctglink + ' text-capitalize'}><b>{item}</b></Nav.Link>
              </Nav.Item>
            })
        }
  </Nav>)
}

export default CategoriesBar