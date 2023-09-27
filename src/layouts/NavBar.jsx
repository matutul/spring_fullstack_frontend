import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className="navbar bg-primary sticky-top text-light">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} style={{ textDecoration: "none" }} className="text-light">
            Fullstack
          </Link>
        </Navbar.Brand>
        <Nav className="me-right">
          {/* <Nav.Link> */}
            <Link to={"/addUser"} style={{ textDecoration: "none" }} className="text-light h-100 px-3 py-2">
              Add user
            </Link>
          {/* </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
