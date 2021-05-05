import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Message/Message";
import Loader from "../../Loader/Loader";
import { listProductDetails } from "../../../redux/actions/productActions";
import FormContainer from "../../FormContainer/FormContainer";
import "../RegisterScreen/RegisterScreen.sass";

const ProductEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(false);

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    history.push("/login");
  }
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(listProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [dispatch, id, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Update Product
  };
  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Name
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Price
              </Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Image
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="CountInStock">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Count In Stock
              </Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Category">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Category
              </Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Description
              </Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="p-3 " type="submit" variant="dark">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
