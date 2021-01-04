import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Message/Message";
import Loader from "../../Loader/Loader";
import { register } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer/FormContainer";
import "./RegisterScreen.sass";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name </Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password...'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button
          disabled={
            name.length === 0 &&
            email.length === 0 &&
            password.length === 0 &&
            confirmPassword.length === 0
          }
          className='p-3 '
          type='submit'
          variant='dark'
        >
          Register
        </Button>
      </Form>

      <Row className='py-3 '>
        <Col>
          Have an Account?{" "}
          <Link
            className='text-dark text-decoration-none'
            to={redirect ? `/login/?redirect=${redirect}` : "/login"}
          >
            <b>Login</b>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
