import { Container } from "react-bootstrap";
import Home from "./Components/Home/Home/Home";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./Components/Home/ProductScreen/ProductScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/product/:id' component={ProductScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
