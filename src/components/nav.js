import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './logo';
import '../styles/nav.css'
export default class Navbar extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg navcol " id='navcol'>
      <div className="navbar d-flex  w-100" >
        
          <a className="navbar-brand justify-content-start" href="#"><Logo/></a>
          <div className='m-3'>
            <Link to="/authenticate">
              <button className="btn  my-2 my-sm-0 justify-content-end" type="submit">login</button>
          </Link>
      
      </div>
  </div>
</nav>
      </>
    )
  }
}
