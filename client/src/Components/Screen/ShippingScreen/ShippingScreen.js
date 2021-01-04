import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ShippingScreen.sass";
import FormContainer from "../../FormContainer/FormContainer";
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import CheckoutStep from "../../CheckoutStep/CheckoutStep";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const history = useHistory();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address...'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city...'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postalCode...'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country...'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='dark'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
