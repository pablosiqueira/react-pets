import React from 'react'
import styles from './FooterInfo.module.css'
import Button from 'react-bootstrap/Button'
import Navbar  from 'react-bootstrap/Navbar'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col  from 'react-bootstrap/Col'
import {TbMail, TbBrandLinkedin, TbNews, TbBrandGithub} from 'react-icons/tb'

const FooterInfo = () => {
    
    return (<>
        <Navbar variant="dark" expand="lg" className={styles.footer}>
        <Container className={styles.flexDirection}>
            <Row className={styles.aboutContact}>
                <Col className={styles.description}>
                    <div className={styles.about}>
                    <h5 className='mb-2'>About</h5>
                    <p>Web page created by Pablo Siqueira. Bachelor in Computer Engineering and Science & Techonology 
                    by the Federal University of Rio Grande do Norte (UFRN) from Brazil and former exchange student of the Lappeeranta 
                    University of Technology (LUT) in Finland.</p>
                    </div>
                </Col>
            
                <Col className={styles.contact}>
                    <h5>Contact & Networks</h5>
                    <ul className={styles.footerlinks}>
                    <li><Button className={styles.btnNone} variant="outline-light" size="sm"><TbMail size='2rem' title='Mail Icon'/> pablo16@outlook.com</Button></li>
                    <li><Button variant="outline-light" size="sm" href="https://www.linkedin.com/in/pablo-siqueira-457867150/" target="_blank"><TbBrandLinkedin size="2rem" title='Linkedin Icon'/> Linkedin</Button></li>
                    <li><Button variant="outline-light" size="sm" href='http://lattes.cnpq.br/9695010765251628' target="_blank"><TbNews size='2rem' title='Curriculum Lattes Icon'/> Curriculum Lattes</Button></li>
                    <li><Button variant="outline-light" size="sm" href='https://github.com/pablosiqueira' target="_blank"><TbBrandGithub size="2rem" title='Github Icon'/> Github</Button></li>
                    </ul>
                </Col>   
            </Row>
            
        </Container>
        
        </Navbar>
        <Navbar className={styles.copyright}>
                <p className="d-block mx-auto my-auto">Copyright &copy; 2022 All Rights Reserved by Pablo Siqueira. </p>
        </Navbar>
    </>)
}

export default FooterInfo