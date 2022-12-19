import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="rounded">
            <Container >
                <Navbar.Brand href="/" >Waiter.app</Navbar.Brand >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Item >
                            <Nav.Link as={ NavLink } to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to ="/newtable">Add Table</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;