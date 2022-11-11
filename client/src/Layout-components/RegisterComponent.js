import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

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
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      return; //TODO: display error in case passwords are not matching
    }
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const salt = genRanHex(16);
    const hashedPassword = bcrypt.hashSync(password, salt)
    const credentials = { email: email, role: role, salt: salt, hash: hashedPassword };
    const user = await props.register(credentials);
    navigate('/'/*+ user.id*/);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='email' className="mb-3">
        <Form.Label className='label'>Email</Form.Label>
        <Form.Control className="form-control" type='email' value={email} onChange={ev => setEmail(ev.target.value)} required={true} />
      </Form.Group>

      <Form.Group>
      <Form.Label className='label'>Role</Form.Label>
        <Form.Control as="select" value={role} aria-label="select" onChange={ev => setRole(ev.target.value)} required={true} >
          <option>select the type of user you are</option>
          <option value="HK">Hiker</option>
          <option value="LG">Local Guide</option>
          <option value="O">Other to be defined</option>
        </Form.Control>
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
