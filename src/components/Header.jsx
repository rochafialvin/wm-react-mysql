import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
   Button,
   Collapse,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Navbar,
   NavbarToggler, 
   Nav,
   NavLink,
   NavItem,
   NavbarBrand,
   UncontrolledDropdown
   } from 'reactstrap';
   
import {onLogout} from '../actions/index.js'
class Header extends Component {

   state = {
      isOpen : false
   }

   toggle = () => this.setState({ isOpen : !this.state.isOpen })


   renderNav = () => {

      // Jika tidak login
      if(!this.props.uname){ 
          return (
              <Nav className="ml-auto" navbar>
                  <NavItem>
                      <NavLink tag={Link} to="/register">Register</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink tag={Link} to="/login">Login</NavLink>
                  </NavItem>
              </Nav>
          )
      }

      // Jika login
      return (
          <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                      Hello, {this.props.uname}
                  </DropdownToggle>
                  <DropdownMenu right>

                      <NavLink tag={Link} to="/manageproduct" >
                          <DropdownItem> Manage Product</DropdownItem>
                      </NavLink>

                      <NavLink tag={Link} to="/carts">
                          <DropdownItem>Cart</DropdownItem>
                      </NavLink>

                      <NavLink tag={Link} to="/carts">
                          <DropdownItem>Cart</DropdownItem>
                      </NavLink>

                      <DropdownItem divider />

                      <DropdownItem onClick={this.props.onLogout}>
                          Logout
                      </DropdownItem>

                  </DropdownMenu>
              </UncontrolledDropdown>
          </Nav>
      )
   }

   render() { 
      return (
         <div>
            <Navbar color="light" light expand="md">
               <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
               <NavbarToggler onClick={this.toggle} />
               <Collapse isOpen={this.state.isOpen} navbar>
                     
                     {this.renderNav()}

               </Collapse>
            </Navbar>
         </div>
      );
   }
}

let mapStateToProps = state => {
   return {
      uname : state.auth.username
   }
}
 
export default connect(mapStateToProps, {onLogout})(Header)
