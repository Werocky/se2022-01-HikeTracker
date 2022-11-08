import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterComponent(props) {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Row>
          <Col></Col>
          <Col xs={10}><h2>Register</h2></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10}><RegisterForm register={props.register} /></Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}

function RegisterForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(confirmPassword !== password){
      return; //TODO: display error in case passwords are not matching
    }
    //TODO: generate salt for the password
    //TODO: add hashing for the password
    const credentials = { email: email, role: 'user' };
    const user = await props.register(credentials);
    navigate('/'+ user.id);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='email' className="mb-3">
        <Form.Label className='label'>Email</Form.Label>
        <Form.Control className="form-control" type='email' value={email} onChange={ev => setEmail(ev.target.value)} required={true} />
      </Form.Group>

      <Form.Group controlId='password' className="mb-3">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control className="form-control" type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={4} />
      </Form.Group>

      <Form.Group controlId='confirmPassword' className="mb-3">
        <Form.Label className='label'>Confirm password</Form.Label>
        <Form.Control className="form-control" type='password' value={password} onChange={ev => setConfirmPassword(ev.target.value)} required={true} minLength={4} />
      </Form.Group>

      <div className="d-grid"><Button type="submit" className="btn btn-success">Register</Button></div>
    </Form>
  )
};

export { RegisterForm, RegisterComponent };
