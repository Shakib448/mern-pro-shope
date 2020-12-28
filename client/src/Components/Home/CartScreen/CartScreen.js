import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  From,
  Button,
  Cart,
} from "react-bootstrap";

import { useParams, useLocation, useHistory } from "react-router-dom";
import { addToCart } from "../../../redux/actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div>
      <h1>cart</h1>
    </div>
  );
};

export default CartScreen;
