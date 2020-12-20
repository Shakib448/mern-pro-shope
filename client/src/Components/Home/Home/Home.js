import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product/Product";
import Axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await Axios.get("/api/products");
      setProducts(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
