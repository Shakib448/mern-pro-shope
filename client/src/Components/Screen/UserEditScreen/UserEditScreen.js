import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Message/Message";
import Loader from "../../Loader/Loader";
import { getUserDetails } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer/FormContainer";
import "../RegisterScreen/RegisterScreen.sass";

const UserEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    history.push("/login");
  }
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log(user);

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Name{" "}
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
