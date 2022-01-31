import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href="/home" style={{ color: 'white' }}>Employee Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{color:'#ffffff'}} id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Tooltip title="Home" arrow>
                            <Nav.Link className="border-end border-warning" href="/home" style={{ color: '#ffffff' }}>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Nav.Link>
                        </Tooltip>
                        <Tooltip title="Add employee" arrow>
                            <Nav.Link href="/employeeAdd" style={{ color: '#ffffff' }}>
                                <FontAwesomeIcon icon={faPlusCircle} /> Employee
                            </Nav.Link>
                        </Tooltip>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;