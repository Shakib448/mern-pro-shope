import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getOrderDetails, payOrder } from "../../../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { ORDER_PAY_RESET } from "../../../redux/constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p style={{ fontWeight: "bold" }}>
                <strong>Name : </strong> {order.user.name}
              </p>
              <p style={{ fontWeight: "bold" }}>
                <strong>
                  Email :{" "}
                  <a
                    className="text-dark text-decoration-none "
                    href={`mailto:${order.user.email}`}
                  >
                    {" "}
                    {order.user.email}
                  </a>
                </strong>
              </p>
              <p style={{ fontWeight: "bold" }}>
                <strong>Address : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {" "}
                  Delivered on {order.deliveredAt}{" "}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : {order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success"> Paid on {order.paidAt} </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className="text-dark text-decoration-none "
                            style={{ fontWeight: "bold" }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{ fontWeight: "bold" }}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
