import { useEffect, useState } from "react";
import { Offcanvas, Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Menu = () => {

  const [desplegarNavbar, setDesplegarNavbar] = useState();

  const ocultarNav = () => {
    setDesplegarNavbar(false)
  };

  const mostrarNav = () =>{
    setDesplegarNavbar(true);
    if (desplegarNavbar) {
      setDesplegarNavbar(false);
    }
  }

  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className=" py-3 menu" expanded={desplegarNavbar}>
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={mostrarNav}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton onClick={ocultarNav}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                  SGT
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 gap-3">
                  <NavLink
                    to="/"
                    className="fs-5 text-decoration-none text-dark" onClick={ocultarNav}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/transacciones"
                    className="fs-5 text-decoration-none text-dark" onClick={ocultarNav}
                  >
                    Transacciones
                  </NavLink>
                  <NavLink
                    to="/categorias"
                    className="fs-5 text-decoration-none text-dark" onClick={ocultarNav}
                  >
                    Categorías
                  </NavLink>
                  <NavLink
                    to="/resumen"
                    className="fs-5 text-decoration-none text-dark" onClick={ocultarNav}
                  >
                    Resumen
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Menu;
