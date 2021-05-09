import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct } from "../../../redux/actions/productActions";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import Product from "../Product/Product";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const numberPage = pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, numberPage));
  }, [dispatch, keyword, numberPage]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
