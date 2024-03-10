import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Alert, Spinner, AlertHeading } from 'react-bootstrap';
import { AUTH_URL } from '../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/userReducer';


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    setStatus('loading');
    fetch(`${AUTH_URL}/login`, options)
      .then((res) => {
        if (res.status === 201) {

          setStatus('success');
          dispatch(logIn({ email }));
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Sign In Here</h1>

      {status === 'loading' && (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      )}

      {status === 'success' && (
        <Alert variant="success" className="rounded">
          <AlertHeading style={{ color: 'white' }}>Success!</AlertHeading>
          <p>
            {' '}
            Successfully logged in! You will be redirected to home page in 3
            seconds
          </p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger" className="rounded">
          <AlertHeading style={{ color: 'white' }}>Error!</AlertHeading>
          <p>Something went wrong while logging. Please try again</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger" className="rounded">
          <AlertHeading style={{ color: 'white' }}>Incorrect data</AlertHeading>
          <p>Wrong login or password</p>
        </Alert>
      )}
      <Form className="standard-box" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Sign In
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;