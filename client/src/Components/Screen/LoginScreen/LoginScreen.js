import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Message/Message";
import Loader from "../../Loader/Loader";
import { login } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer.js/FormContainer";
import "./LoginScreen.sass";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='p-3 ' type='submit' variant='dark'>
          Sign In
        </Button>

        <Row className='py-3 '>
          <Col>
            New Customer?{" "}
            <Link
              className='text-dark text-decoration-none'
              to={redirect ? `/register/?redirect=${redirect}` : "/register"}
            >
              <b>Register</b>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
