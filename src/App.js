import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import Form from 'react-bootstrap/Form'

import { Button } from 'react-bootstrap';
import { Suspense, useState } from 'react';


const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState('');
  const [success, setSuccess] = useState('')

  const emailField = (e) => {
    setEmail(e.target.value)
  }
  const passwordField = (e) => {
    setPassword(e.target.value)
  }
  const stopRelode = (e) => {
    e.preventDefault();
  }

  const submit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidated(true);
    setError('');
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('please text atlist one upper Case');
      return;
    }
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          setEmail(user);
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          emailVerification();
          setSuccess('Success full Registered')
        }).catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    const emailVerification = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('varify going')
        });
    }
  }
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('pass reset going')
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const checkBox = (e) => {
    setRegistered(e.target.checked)
  }
  return (
    <div className="mt-4">
      <Form noValidate validated={validated} onSubmit={stopRelode} className='w-50 mx-auto'>
        <h2 className='text-primary'>Please Registration!!</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={emailField} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passwordField} type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={checkBox} type="checkbox" label="you before login?" />
        </Form.Group>
        {error ? <h6 className='text-danger'>{error}</h6>: <h6 className='text-success'>{success}</h6>}
        <Button onClick={submit} variant="primary" type="submit">
          {registered ? 'Login' : 'register'}
          <br />

        </Button>
        {registered && <Button onClick={resetPassword} variant="link">Forget password</Button>}
      </Form>
    </div>
  );
}

export default App;
