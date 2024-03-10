// Navigation.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Form, Button, NavItem, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLoggedInUser } from '../utils/LocalStorage'; 
import styles from '../views/Navigation.module.scss';

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
   
    checkLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Navbar expand="lg mt-3">
        <Container fluid>
          <Navbar.Brand href="/" className={styles.navbarBrand}>
            BookBar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
           
            {!user || user === null ? (
              <>
                <NavItem className="d-block d-xl-block mx-2">
                  <NavLink href="/register">Sign Up</NavLink>
                </NavItem>
                <NavItem className="d-block d-xl-block mx-2">
                  <NavLink href="/sign-in">Sign In</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="d-block d-xl-block mx-2">
                  <NavLink href="/sign-out">Sign Out</NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              <NavLink href="/cart">
                <Button variant="outline-dark">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </Button>
              </NavLink>
            </NavItem>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navigation;
