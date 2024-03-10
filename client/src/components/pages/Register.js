import {Container} from 'react-bootstrap';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import { AUTH_URL } from '../../config';


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [status, setStatus] = useState(null);

const handleSubmit = (e) => {
  e.preventDefault();

  const userData = {
    email,
    password,
    passwordRepeat,
  };

  setStatus('loading');

  fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.status === 201) {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('emailError');
      } else {
        setStatus('serverError');
      }
      return res.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 >Sign Up Here</h1>

      {status === 'loading' && (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      )}

      {status === 'success' && (
        <Alert variant="success" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Registered successfully!
          </Alert.Heading>
          <p>You will be navigated to the main page in 3 seconds</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Error while registering!
          </Alert.Heading>
          <p>Please try again</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Not enough data!
          </Alert.Heading>
          <p>Please fill all fields</p>
        </Alert>
      )}

      {status === 'emailError' && (
        <Alert variant="warning" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Email already in use!
          </Alert.Heading>
          <p>Try using another email</p>
        </Alert>
      )}

      <Form className="standard-box" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordRepeat">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            placeholder="Confirm password"
          />
        </Form.Group>
        
        <Button variant="outline-dark" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;