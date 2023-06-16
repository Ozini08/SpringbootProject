import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
function Header(){
    return(
        <div className="App container py-3">
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
                <Navbar.Brand href="/" className="font-weight-bold text-muted">
                    Scratch
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes />
        </div>
    );
}
export default Header;