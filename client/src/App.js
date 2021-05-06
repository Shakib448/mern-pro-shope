import { Container } from "react-bootstrap";
import Home from "./Components/Home/Home/Home";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./Components/Home/ProductScreen/ProductScreen";
import CartScreen from "./Components/Home/CartScreen/CartScreen";
import LoginScreen from "./Components/Screen/LoginScreen/LoginScreen";
import RegisterScreen from "./Components/Screen/RegisterScreen/RegisterScreen";
import ProfileScreen from "./Components/Screen/ProfileScreen/ProfileScreen";
import ShippingScreen from "./Components/Screen/ShippingScreen/ShippingScreen";
import PaymentScreen from "./Components/Screen/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./Components/Screen/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./Components/Screen/OrderScreen/OrderScreen";
import UserListScreen from "./Components/Screen/UserListScreen/UserListScreen";
import UserEditScreen from "./Components/Screen/UserEditScreen/UserEditScreen";
import ProductListScreen from "./Components/Screen/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./Components/Screen/ProductEditScreen/ProductEditScreen";
import OrderListScreen from "./Components/Screen/OrderListScreen/OrderListScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route exact path="/order/:id" component={OrderScreen} />
              <Route exact path="/shipping" component={ShippingScreen} />
              <Route exact path="/placeOrder" component={PlaceOrderScreen} />
              <Route exact path="/payment" component={PaymentScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/profile" component={ProfileScreen} />
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/cart/:id?" component={CartScreen} />
              <Route exact path="/admin/userList" component={UserListScreen} />
              <Route
                exact
                path="/admin/productList"
                component={ProductListScreen}
              />
              <Route
                exact
                path="/admin/user/:id/edit"
                component={UserEditScreen}
              />
              <Route
                exact
                path="/admin/product/:id/edit"
                component={ProductEditScreen}
              />
              <Route
                exact
                path="/admin/orderList"
                component={OrderListScreen}
              />
              <Route exact path="/" component={Home} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
