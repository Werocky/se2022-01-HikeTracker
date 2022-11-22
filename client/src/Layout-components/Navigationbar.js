import { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import AuthContext from '../AuthContext';

function NavigationBar(props){

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    return <Navbar className='navbar navbar-dark bg-dark' position='sticky' fixed='top' >
        <Container fluid>
            <h2 className="main-title col-4 text-white" onClick={ ()=> navigate('/')}>
                <i className="bi bi-building"></i>
                <span className="d-none d-md-inline">Hike-Tracker</span>
            </h2>
            <h3 className='text-white'>Welcome, {auth.login === false ? 'Guest' : auth.user.Id}!</h3>
            {auth.login ? <Logout logout={props.logout} navigate={navigate}/> : <Login navigate={navigate}/>}
        </Container>
    </Navbar>
}

function Login(props){
    return <div className='col-4 d-flex flex-row-reverse'>
        <Button variant="outline-success" onClick={ () => props.navigate('/login')}>
            <span className='btn-icon'><i className="bi bi-box-arrow-in-right mr-2"></i></span><span>Log-In</span>
        </Button>
        <Button variant="outline-success" onClick={() => props.navigate('/register')}>
            <span className='btn-icon'><i className="bi bi-file-earmark-plus"></i></span><span>Register</span>
        </Button>
    </div>
}

function Logout(props){
    return <div className='col-4 d-flex flex-row-reverse'>
        <Button variant="outline-danger" onClick={() => props.logout(props.navigate)}>
            <span className='btn-icon'><i className="bi bi-box-arrow-left"></i></span><span>Logout</span>
        </Button>
    </div>
}


export default NavigationBar;