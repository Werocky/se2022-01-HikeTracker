import { useContext } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

function NavigationBar(props) {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    return <Navbar collapseOnSelect className='navbar navbar-dark bg-dark' fixed='top' sticky='top' >
        <Container fluid>
            <Navbar.Brand>
                <h2 className="main-title col-4 text-white" onClick={() => navigate('/')}>
                    <i className="bi bi-image-alt"></i>
                    <span className="d-none d-md-inline">Hike-Tracker</span>
                </h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Hikes</Nav.Link>
                    <Nav.Link href="/huts">Huts</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <h3 className='text-white'>Welcome, {auth.login === false ? 'Guest' : auth.user.Id}!</h3>
            {auth.login ?
                <Button variant="outline-success" onClick={() => navigate("/profile/" + auth.user.Id)}>
                    <span className='btn-icon'><i className="bi bi-person-fill"> Profile</i></span>
                </Button> :
                <Login navigate={navigate} />}
        </Container>
    </Navbar>
}

function Login(props) {
    return <div className='col-4 d-flex flex-row-reverse'>
        <Button variant="outline-success" onClick={() => props.navigate('/login')}>
            <span className='btn-icon'><i className="bi bi-box-arrow-in-right mr-2"></i></span><span>Log-In</span>
        </Button>
        <Button variant="outline-success" onClick={() => props.navigate('/register')}>
            <span className='btn-icon'><i className="bi bi-file-earmark-plus"></i></span><span>Register</span>
        </Button>
    </div>
}


export default NavigationBar;