import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <>
            <Nav.Link
              as={Link}
              to='/login'
              style={{ color: "black", fontWeight: "bold" }}
            >
              Sign In
            </Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to='#' disabled>
            <strike>Sign In</strike>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <>
            <Nav.Link
              as={Link}
              to='/shipping'
              style={{ color: "black", fontWeight: "bold" }}
            >
              Shipping
            </Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to='#' disabled>
            <strike>Shipping</strike>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <>
            <Nav.Link
              as={Link}
              to='/payment'
              style={{ color: "black", fontWeight: "bold" }}
            >
              Payment
            </Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to='#' disabled>
            <strike> Payment</strike>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <>
            <Nav.Link
              as={Link}
              to='/placeOrder'
              style={{ color: "black", fontWeight: "bold" }}
            >
              Place Order
            </Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to='#' disabled>
            <strike>Place Order</strike>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
