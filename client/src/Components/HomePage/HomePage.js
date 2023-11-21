// Navbar.js
import React from 'react';
import styled from 'styled-components';
import ExpenseTracker from './ExpenseTracker';

const NavbarContainer = styled.div`
  background-color: #24292e;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = () => {
  return (
    <NavbarContainer>
      <Logo>GitHub</Logo>
      <NavLinks>
        <NavLink href="#">Pull requests</NavLink>
        <NavLink href="#">Issues</NavLink>
        <NavLink href="#">Marketplace</NavLink>
        <NavLink href="#">Explore</NavLink>
      </NavLinks>
    </NavbarContainer>
   
  );
};



export default HomePage