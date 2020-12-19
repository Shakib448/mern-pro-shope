import { Container } from "react-bootstrap";
import Home from "./Components/Home/Home/Home";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to the ProShop</h1>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
