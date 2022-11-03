import Breadcrumb from 'react-bootstrap/Breadcrumb';
import classes from './PetDetails.module.css'

const CategoryBreadcrumb = (props) => {
    let links = [{link:'/pets/', section: 'pets'}]
    let paths = '/pets/'
    props.sections.map(
        item => {
            paths = paths + item + '/'
            links.push({link: paths, section: item})
        }   
    )

    return (
        <>
        <Breadcrumb className={'m-2 text-capitalize ' + classes.fontRoboto}>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            {links.map(item => (
                <Breadcrumb.Item href={item.link} key={item.section}>{item.section}</Breadcrumb.Item>
            ))}
            <Breadcrumb.Item active>{props.lastItem}</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default CategoryBreadcrumb