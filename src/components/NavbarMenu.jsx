import React, { useContext } from 'react'
import logo from "../images/logoOnly1.png"

import { UserContext } from '../contexts/UserContext';
import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap"

import Cookie from 'universal-cookie'


export default function NavbarMenu() {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" dir="rtl" className="top"
                style={{ fontSize: "1.2rem"}}
                >
                
                <Container>
                    <Navbar.Brand href="/" style={{width:"8%"}}>
                        <img width={'70rem'} src={logo} alt="Logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                    <Navbar.Collapse id="responsive-navbar-nav">                        
                        <Nav className="me-auto" >
                            {/* <Nav.Link href="/" style={{ color: "#424242" }}>الرئيسية</Nav.Link> */}
                           
                            {
                                isLoggedIn ?
                                <>
                                    <Nav.Link href="/servers" >Servers</Nav.Link>
                                </> : null
                            }

                            {new Cookie().get("userRole") === "admin"?
                            
                            <NavDropdown title="Admin">
                                <NavDropdown.Item href="/all-servers">إدارة Servers </NavDropdown.Item>
                                <NavDropdown.Item href="/users">إدارة المستخدمين </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/newServerAdmin">إضافة Server</NavDropdown.Item>
                            </NavDropdown>: null
                            }

                        </Nav>
                        {/* <Nav className="me-auto"/> */}

                        <Nav className="me-auto">
                        </Nav>
                            
                        {
                            !isLoggedIn ?
                            <Nav >
                                    {/* <Nav.Link href="/register">إنشاء حساب </Nav.Link> */}
                                    <Nav.Link href="/login">تسجيل الدخول</Nav.Link>

                            </Nav> :
                            <Nav>
                                <Nav.Link href="/logout"> تسجيل الخروج </Nav.Link>

                            </Nav>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

