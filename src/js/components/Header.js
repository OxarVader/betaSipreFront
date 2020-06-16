import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


//import Dropdown from "react-bootstrap/Dropdown";
//import DropdownButton from "react-bootstrap/DropdownButton";
//import Form from "react-bootstrap/Form";
//import FormControl from "react-bootstrap/FormControl";
//import Button from "react-bootstrap/Button";


const Header = () => (
  <header className="header">
    
    <nav id="header" className="navbar navbar-expand-lg navbar-dark sticky-top">
        <Navbar className="container">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            data-toggle="collapse"
            data-target="#navbarRegionesCUSAEM"
            aria-controls="navbarRegionesCUSAEM"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="#">Archivo</Nav.Link>
              <NavDropdown title="Nómina" id="navbarDropdownMenuNomina" 
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <NavDropdown.Item to="/asignaciones"> {""} asignaciones {""} </NavDropdown.Item>

                <NavDropdown.Item to="/incidencias"> {""} incidencias {""} </NavDropdown.Item>

                <NavDropdown.Item to="/reportes"> {""} reportes {""} </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link to="/login_email">Salir</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </nav>
  </header>
);

export default Header;
