import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CreateProductPage from './CreateProductPage';
import ProductListingPage from './ProductListingPage';

function App() {
  return (
    <Router>
      <Navbar style={{ background: "#ffcf00" }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://companieslogo.com/img/orig/MLYBY-02c8d7ff.png?t=1654367173"
              alt="Maybank Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link style={{ color: "black" }} href="/create">Create Product</Nav.Link>
              <Nav.Link style={{ color: "black" }} href="/list">Product Listing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/create" element={<CreateProductPage />} />
          <Route path="/list" element={<ProductListingPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Maybank Assessment</p>
    </div>
  );
}

export default App;